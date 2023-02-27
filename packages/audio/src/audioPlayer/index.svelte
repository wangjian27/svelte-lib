<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { dealContent } from './dealContent';
  const dispatch = createEventDispatcher();
  export let seq: string = '';
  export let title: string = '';
  export let content: string = '';
  export let statPageId: string = '';
  export let btnText: string = '听财经';
  const imgList: string[] = [
    '//i.thsi.cn/webprivate/voicebroadcast/play.png',
    '//i.thsi.cn/webprivate/voicebroadcast/playN.png',
    '//i.thsi.cn/webprivate/voicebroadcast/pause.png',
    '//i.thsi.cn/webprivate/voicebroadcast/pauseN.png'
  ];

  let showImage: number = 2;
  let readTime: number = 1;
  let canvasBox: HTMLElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let formatData: string[];
  let playing: boolean = false;
  let animateId: number;
  let audioData: number[] | { volume: number; increase: boolean }[] = [
    5, 7, 5, 11, 7, 5, 7, 9, 11, 7, 9, 5, 7, 5, 3, 7, 5, 7, 3, 9, 7, 11, 7, 5, 7, 3, 9, 7, 5, 9
  ];
  let rectWidth: number = 0;
  let blockWidth: number = 0;
  let isStartPlay: boolean = false;
  let voiceStartTime: number = 0;
  const initCanvas = () => {
    const dpr: number = window.devicePixelRatio || 1;
    ctx = canvas.getContext('2d');
    canvas.style.width = `${canvasBox.offsetWidth}px`;
    canvas.style.height = `${canvasBox.offsetHeight}px`;
    canvas.width = canvasBox.offsetWidth * dpr;
    canvas.height = canvasBox.offsetHeight * dpr;
    // 空白宽度5 频域矩形宽度2
    rectWidth = canvas.width * (2 / (30 * 2 + 29 * 5));
    blockWidth = canvas.width * (5 / (30 * 2 + 29 * 5.05));
    audioData = audioData.map((item) => ({
      volume: item,
      increase: item <= 7
    }));
    animate(true);
  };
  const animate = (isInit: boolean) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    audioData.forEach((item, idx: number) => {
      const { volume: height } = item;
      const realHeight: number = canvas.height * (height / 17);
      const startPointX: number = idx * (rectWidth + blockWidth) + rectWidth / 2 + 1;
      const startPointY: number = (canvas.height - realHeight) / 2;
      ctx.beginPath();
      ctx.arc(startPointX, startPointY, rectWidth / 2, 0, Math.PI, true);
      ctx.arc(startPointX, startPointY + realHeight, rectWidth / 2, -Math.PI, 0, true);
      ctx.fillStyle =
        window.getCssStyle() === 'black' ? 'rgba(253, 67, 50, .5)' : 'rgba(233, 48, 48, .5)';
      ctx.fill();
    });
    if (!isInit) {
      audioData = audioData.map((item) => {
        if (item.increase) {
          item.volume += 0.3;
        } else {
          item.volume -= 0.3;
        }
        if (item.volume >= 11) {
          item.increase = false;
        } else if (item.volume <= 2) {
          item.increase = true;
        }
        return item;
      });
      animateId = window.requestAnimationFrame(animate.bind(this, false));
    }
  };
  const stopAnimate = () => {
    window.cancelAnimationFrame(animateId);
  };
  const handleClickPlay = () => {
    // 播放逻辑
    if (!playing) {
      if (!isStartPlay) {
        display();
      } else {
        continuePlay();
      }
    } else {
      pause();
    }
  };
  // 调用客户端播放
  const display = () => {
    window.callNativeHandler('zxVoiceBroadcast', {
      seq,
      title,
      state: 1,
      content: formatData
    });
  };
  // 客户端暂停
  const pause = () => {
    window.callNativeHandler('zxVoiceBroadcast', {
      seq,
      state: 2
    });
  };
  // 客户端继续
  const continuePlay = () => {
    window.callNativeHandler('zxVoiceBroadcast', {
      seq,
      state: 3
    });
  };
  // 监听语音客户端的播放与暂停
  const zxCallback = (code: number) => {
    const getExObj = () => {
      if (!voiceStartTime) {
        voiceStartTime = +(window.localStorage.getItem(seq) || 0);
      }
      return {
        targid: `bt_${voiceStartTime}`
      };
    };
    switch (code) {
      // 播放完毕
      case 0:
        isStartPlay = false;
        if (playing) {
          playing = false;
          dispatch('onplayover');
          stopAnimate();
        }
        statPageId && window.hxmClickStat(`${statPageId}.over`, getExObj());
        break;
      // 开始播放
      case 1:
        playing = true;
        isStartPlay = true;
        animate(false);
        dispatch('ondisplay');
        voiceStartTime = new Date().getTime();
        window.localStorage.setItem(seq, String(voiceStartTime));
        statPageId && window.hxmClickStat(`${statPageId}.start`, getExObj());
        break;
      // 暂停播放
      case 2:
        playing = false;
        isStartPlay = true;
        stopAnimate();
        dispatch('onpause');
        statPageId && window.hxmClickStat(`${statPageId}.pause`, getExObj());
        break;
      // 继续播放
      case 3:
        playing = true;
        isStartPlay = true;
        animate(false);
        dispatch('oncontinue');
        statPageId && window.hxmClickStat(`${statPageId}.continue`, getExObj());
        break;
      default:
        break;
    }
  };
  onMount(() => {
    // ios监听状态
    window.callNativeHandler(
      'NotifyNativeEventToWeb', //必填
      '' //必填
    );
    window.registerWebHandler(
      'NotifyNativeEventToWeb',
      (data: { key: string; result: { code: string | number } }) => {
        if (data.key === 'zx_tts_stop') {
          zxCallback(+data.result.code);
        }
      }
    );
    // 安卓监听状态
    window.registerWebHandler('zxVoiceBroadcast', (data: { state: string | number }) => {
      zxCallback(+data.state);
    });
    // 兼容某些机型tick失效的情况
    setTimeout(() => {
      initCanvas();
      window.callNativeHandler(
        'zxVoiceBroadcast',
        {
          seq,
          state: 4
        },
        () => {
          // 客户单协议
        }
      );
    });
  });
  $: {
    if (window.getCssStyle() === 'black') {
      showImage = playing ? 3 : 1;
    } else {
      showImage = playing ? 2 : 0;
    }
  }
  $: {
    const formatNum: number = 300;
    const { dataLength, origniformatData } = dealContent(content);
    formatData = origniformatData;
    readTime = Math.ceil(dataLength / formatNum);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="voice" on:click={handleClickPlay}>
  <div class="container light-bd">
    <div class="voice-btn">
      {#each imgList as item, index (item)}
        <img
          class="voice-btn-img"
          src={item}
          alt=""
          style={`display:${showImage === index ? 'inline' : 'none'}`}
        />
      {/each}
      <div class="voice-btn-text sub-text-gray">{btnText}</div>
    </div>
    <div class="voice-canvas" bind:this={canvasBox}>
      <canvas id="canvas" bind:this={canvas} />
    </div>
    <div class="voice-time">
      <div class="voice-btn-text sub-text-gray">约{readTime}分钟</div>
    </div>
  </div>
</div>

<style lang="less">
  .theme-mixins(@css_key, @light_value, @dark_value: @light_value) {
    & {
      @{css_key}: @light_value;
    }
    :global([theme-mode='black']) & {
      @{css_key}: @dark_value;
    }
  }
  .voice {
    width: 90vw;
    margin: 0.3rem 0.15rem;
    line-height: 0.33rem;
    &-btn {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      padding: 0.02rem 0.08rem;
      margin-right: 0.08rem;
      &-img {
        height: 0.33rem !important;
        width: 0.33rem !important;
        margin: 0 0.08rem;
      }
      &-text {
        font-size: 0.24rem;
      }
    }
    &-canvas {
      position: relative;
      display: flex;
      height: 0.33rem;
      overflow: hidden;
      margin: 0.06rem 0;
      flex: 1;
    }
    &-time {
      flex-shrink: 0;
      padding: 0 0.2rem;
    }
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    border-width: 0.01rem;
    -webkit-box-pack: justify;
    border-style: solid;
    height: 0.6rem;
  }
  .light-bd {
    .theme-mixins(border-color,#f5f5f5,#202022);
  }
</style>
