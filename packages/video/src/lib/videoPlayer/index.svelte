<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import Hls from 'hls.js';
  import { debounce } from 'throttle-debounce';
  import {
    timeFormat,
    toggleFullScreen,
    isMobile,
    hexToRgba,
    eventPathPolyfill
  } from './utils/util';
  import DSlider from './component/DSlider.svelte';
  import DSwitch from './component/DSwitch.svelte';
  import DIcon from './component/DIcon.svelte';
  import DContextmenu from './component/DContextmenu.svelte';
  import DLoading from './component/DLoading.svelte';
  import DPlayerTop from './component/DPlayerTop.svelte';
  import DStatus from './component/DStatus.svelte';
  import DFeedbackIcon from './component/DFeedbackIcon.svelte';
  import { State, Emits } from './utils/types';
  import { videoEmits } from './plugins/index';
  import { language, LanguageType, LanguageItem } from './internationalization/index';
  // 兼容高版本浏览器Event.path取消的情况
  eventPathPolyfill();
  const emits: Emits = createEventDispatcher();
  // 国际化
  export let languageType: LanguageType = 'zh-cn';
  // 语言
  const nowLanguage: LanguageItem = language[languageType] || language['zh-cn'];
  export let width: State['width'] = '800px';
  export let height: State['height'] = '450px';
  // 色彩换肤
  export let color: State['color'] = '#E93030';
  // 色彩渐变底部
  export let colorEnd: State['colorEnd'] = '#F06F6F';
  //视频源
  export let src: State['src'] = '';
  //视频名称
  export let title: State['title'] = '';
  //视频类型
  export let type: State['type'] = 'video/mp4';
  //封面
  export let poster: State['poster'] = '';
  //网页全屏
  export let webFullScreen: State['webFullScreen'] = false;
  //是否支持快进快退 //移动端不支持
  export let canSpeed: State['canSpeed'] = true;
  //当前播放时间
  export let currentTime: number = 0;
  //ios端 点击播放是否全屏
  export let playsinline: State['playsinline'] = false;
  //静音
  export let muted: State['muted'] = false;
  //播放倍速
  export let speedRate: State['speedRate'] = ['2.0', '1.5', '1.25', '1.0', '0.75', '0.5'];
  //自动播放
  export let autoPlay: State['autoPlay'] = false;
  //循环播放
  export let loop: State['loop'] = false;
  //镜像画面
  export let mirror: State['mirror'] = false;
  //关灯模式
  export let lightOff: State['lightOff'] = false;
  //默认音量大小
  export let volume: State['volume'] = 1;
  //是否显示控制器
  export let control: State['control'] = true;
  //是否显示控制器
  export let controlBtns: State['controlBtns'] = [
    'progress',
    'progressTime',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ];
  //预加载
  export let preload: State['preload'] = 'auto';
  // 分别率数组
  export let qualityLevels: State['qualityLevels'] = [];
  // 右键弹出的内容
  export let contextMenu: string[] = ['filter', 'hotkey', 'copy', 'version'];
  // 加载动画的img
  export let loadingImg: string = '';
  // 加载动画的dom
  export let loadingDom: string = '';
  // 加载动画的类型
  export let loadingType: string = '';
  // 加载中文案
  export let loadingText: string = nowLanguage.loading;
  // 是否有反馈入口
  export let hasFeedBack: boolean = false;
  // 展示的状态
  const state: State = {
    width,
    height,
    color,
    colorEnd,
    src,
    title,
    type,
    poster,
    webFullScreen,
    canSpeed,
    playsinline,
    muted,
    speedRate,
    autoPlay,
    loop,
    mirror,
    lightOff,
    volume,
    control,
    controlBtns,
    preload,
    //分辨率数组
    qualityLevels,
    // 是否有反馈入口
    hasFeedBack,
    // 展示反馈栏
    isShowFeedBack: false,
    currentTime: '',
    dVideo: null,
    // 播放按钮状态
    playBtnState: autoPlay ? 'pause' : 'play',
    // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
    loadStateType: 'loadstart',
    fullScreen: false,
    //当前操作类型
    handleType: '',
    // 当前缓冲进度
    preloadBar: 0,
    //总时长
    totalTime: '00:00:00',
    isVideoHovering: true,
    //倍速
    speedActive: '1.0',
    //播放进度
    playProgress: 0,
    //是否倍速播放
    isMultiplesPlay: false,
    longPressTimeout: null,
    //进度条光标时间
    progressCursorTime: '00:00:00',
    //首选分辨率
    currentLevel: 0
  };
  // 组件版本
  const version: string = '1.0.0';
  // hls实例
  let hls: Hls;
  //wrap
  let refPlayerWrap: HTMLElement;
  // 视频播放器
  let refdVideo: State['dVideo'];
  //播放器控制器
  let refPlayerControl: HTMLElement;
  //快捷键操作
  let refInput: HTMLElement;
  // 网页全屏文案
  $: webFullText = state.webFullScreen ? nowLanguage.exitWebFullScreen : nowLanguage.webFullScreen;
  $: fullText = state.fullScreen ? nowLanguage.exitFullScreen : nowLanguage.fullScreen;
  // 把颜色格式化为rgb格式
  const hexToRgbaColor = hexToRgba(state.color);
  const hexToRgbaColorEnd = hexToRgba(state.colorEnd);
  const feedbackConfirm = ({
    detail
  }: CustomEvent<{ feedbackOptions: string[]; feedbackValue: string }>): void => {
    emits('feedbackConfirm', detail);
  };
  // 当设置speed为false并且试图调试进度的时候触发
  const speedDisabled = ({ detail }: CustomEvent<number>) => {
    emits('speedDisabled', detail);
  };
  // 清空当前操作类型
  // @ts-ignore
  const clearHandleType = debounce(500, () => {
    state.handleType = '';
  });
  // 音量 +++ --
  const volumeKeydown = (ev: KeyboardEvent) => {
    ev.preventDefault();
    if (ev.code == 'ArrowUp') {
      state.volume = state.volume + 0.1 > 1 ? 1 : state.volume + 0.1;
    } else {
      state.volume = state.volume - 0.1 < 0 ? 0 : state.volume - 0.1;
    }
    state.muted = false;
    state.handleType = 'volume'; //操作类型  音量
    clearHandleType(); //清空 操作类型
  };
  const keydownLeft = (ev: KeyboardEvent) => {
    if (!canSpeed) return; // 如果不支持快进快退s
    state.dVideo.currentTime = state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
    videoEvents.timeupdate(state.dVideo);
    playHandle();
  };
  const keypress = (ev: KeyboardEvent, type?: string) => {
    ev.preventDefault();
    const pressType: string = ev.type;
    // 方向右键
    if (ev.keyCode === 39) {
      playHandle();
      if (pressType === 'keyup') {
        clearTimeout(state.longPressTimeout);
        // 如果不支持快进快退 如果关闭快进快退必须在没有长按倍速播放的情况下
        if (!canSpeed && !state.longPressTimeout) {
          return;
        }
        if (state.isMultiplesPlay) {
          //如果倍速播放中
          state.dVideo.playbackRate = +state.speedActive;
          state.isMultiplesPlay = false;
        } else {
          // 进度加10s
          state.dVideo.currentTime = state.dVideo.currentTime + 10;
          videoEvents.timeupdate(state.dVideo);
        }
        // 如果长按5倍速播放
      } else if (pressType === 'keydown') {
        if (!canSpeed) {
          return;
        }
        if (state.isMultiplesPlay) {
          clearTimeout(state.longPressTimeout);
        }
        state.longPressTimeout = window.setTimeout(() => {
          state.isMultiplesPlay = true;
          state.dVideo.playbackRate = 5;
          state.handleType = 'playbackRate'; //操作类型 倍速播放
          clearHandleType(); //清空 操作类型
        }, 500);
      }
    }
    if (type === 'keydown') {
      switch (ev.keyCode) {
        case 32:
          // 空格
          togglePlay(ev);
          break;
        case 70:
          // f键
          controlBtns.includes('fullScreen') && toggleFullScreenHandle();
          break;
        case 37:
          // 方向左键
          keydownLeft(ev);
          break;
        case 38:
          // 方向上键
          volumeKeydown(ev);
          break;
        case 40:
          // 方向下键
          volumeKeydown(ev);
          break;
        default:
          break;
      }
      clearHandleType();
    }
  };
  // 聚焦到播放器
  const inputFocusHandle = () => {
    if (!isMobile) {
      refInput.focus();
    }
  };
  // 当用户没有在当前tab下操作的就以静音的方式播放，如果已经操作就直接播放
  interface playError extends Error {
    code?: number;
  }
  const playErrorHandle = (error: playError) => {
    const { code, message, name } = error;
    if (
      message.includes("play() failed because the user didn't interact with the document first") &&
      code === 0 &&
      name === 'NotAllowedError'
    ) {
      state.muted = true;
      tick().then(() => {
        playHandle();
      });
    } else {
      setTimeout(() => {
        state.playBtnState = 'replay';
        state.loadStateType = 'error';
      }, 500);
    }
  };
  // 播放方法
  const playHandle = () => {
    state.loadStateType = 'play';
    const playResult: Promise<void> = state.dVideo.play();
    // 如此处理是解决chrome49等低版本play()返回的不是promise
    if (playResult) {
      playResult.catch((error: Error) => {
        playErrorHandle(error);
      });
    }
    state.playBtnState = 'pause';
  };
  // 暂停
  const pauseHandle = () => {
    state.loadStateType = 'pause'; // 暂停状态
    state.dVideo.pause();
    state.playBtnState = 'play'; // 暂停后要显示播放按钮
  };

  // 播放暂停
  const togglePlay = (ev: Event) => {
    if (ev) {
      ev.preventDefault();
    }
    if (state.playBtnState == 'play' || state.playBtnState == 'replay') {
      // 点击播放按钮 或 重新播放按钮 后
      playHandle();
    } else if (state.playBtnState == 'pause') {
      // 点击暂停按钮后...
      pauseHandle();
    }
  };
  // 静音事件
  const toggleMuted = () => {
    state.muted = !state.muted;
    // 如果之前音量调整为0 取消静音时会把音量设置为5
    if (state.volume === 0) {
      state.volume = 0.05;
    }
  };
  //进度条事件
  const progressBarChange = ({
    detail: { ev, value }
  }: CustomEvent<{ ev: Event; value: number }>) => {
    // @ts-ignore
    const duration = state.dVideo.duration || state?.dVideo?.target?.duration; // 媒体总长
    state.dVideo.currentTime = duration * value;
    if (state.playBtnState === 'play') {
      playHandle();
    }
  };
  // 进度条移动
  const onProgressMove = ({
    detail: { ev, val }
  }: CustomEvent<{ ev: MouseEvent; val: number }>) => {
    state.progressCursorTime = timeFormat(state.dVideo.duration * val);
  };

  // 隐藏控制器
  // @ts-ignore
  const hideControl = debounce(2500, () => {
    state.isVideoHovering = false;
  });
  // 鼠标在播放页面上滑动
  const mouseMovewWarp = (ev: MouseEvent) => {
    state.isVideoHovering = true;
    hideControl();
  };

  // 播放清晰度改变
  const qualityLevelsHandle = (row: any, index: number) => {
    if (hls) {
      hls.currentLevel = index;
    }
    state.currentLevel = index;
  };
  // 播放速度
  const playbackRate = (row: string) => {
    state.speedActive = row;
    state.dVideo.playbackRate = +row;
  };
  //镜像画面事件
  const mirrorChange = (val: CustomEvent<boolean>) => {
    emits('mirrorChange', { mirrorStatus: val.detail, videoDom: state.dVideo });
  };
  // 是否循环事件
  const loopChange = (val: CustomEvent<boolean>) => {
    emits('loopChange', { loopStatus: val.detail, videoDom: state.dVideo });
  };
  // 关灯事件
  const lightOffChange = (val: CustomEvent<boolean>) => {
    emits('lightOffChange', { lightOffStatus: val.detail, videoDom: state.dVideo });
  };
  // 退出画中画
  const exitPictureInPicture = () => {
    document.exitPictureInPicture();
  };
  // 开启画中画
  const requestPictureInPicture = () => {
    state.dVideo.requestPictureInPicture();
  };
  // 画中画
  const requestPictureInPictureHandle = () => {
    // 画中画模式
    if (document.pictureInPictureElement) {
      exitPictureInPicture();
    } else {
      //开启
      requestPictureInPicture();
    }
  };
  // 全屏按钮
  const toggleFullScreenHandle = () => {
    state.fullScreen = toggleFullScreen(refPlayerWrap);
  };
  // 收集的默认video事件，触发一些个性化的事件之后，再走emit
  const compose =
    (...args: any[]) =>
    (ev: Event) =>
      args.reverse().reduce((acc, fn) => {
        if (fn) {
          return fn(acc);
        }
      }, ev);
  // 收集video事件,将其emit出去
  const videoEvents: Record<string, any> = videoEmits.reduce(
    (events, emit: State['loadStateType']) => {
      events[emit] = (ev: Event) => {
        if (['stalled', 'error'].includes(emit)) {
          state.playBtnState = 'replay';
        }
        state.loadStateType = emit;
        if (!['canplay', 'durationchange', 'progress', 'timeupdate'].includes(emit)) {
          emits(emit, { currentTime: state.dVideo.currentTime, duration: state.dVideo.duration });
        }
      };
      return events;
    },
    {}
  );
  // 可以播放
  videoEvents['canplay'] = compose(videoEvents['canplay'], (ev: Event) => {
    if (state.playBtnState !== 'play' || state.autoPlay) {
      playHandle();
    }
    emits('canplay', { videoDom: state.dVideo, duration: state.dVideo.duration });
  });
  // 播放结束// 合并函数
  videoEvents['ended'] = compose(videoEvents['ended'], (ev: Event) => {
    state.playBtnState = 'replay'; //此时的控制按钮应该显示重新播放
  });

  // 资源长度改变
  videoEvents['durationchange'] = (ev: Event) => {
    emits('durationchange', { duration: state.dVideo.duration });
    if (currentTime !== 0) {
      state.dVideo.currentTime = currentTime;
    }
    //更新当前时长的所有状态
    videoEvents.timeupdate(ev);
  };
  // 缓冲下载中
  videoEvents['progress'] = (ev: any) => {
    const duration = ev.target.duration; // 媒体总长
    emits('progress', { duration, currentTime: state.dVideo.currentTime });
    const length = ev.target.buffered;
    const end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
    state.preloadBar = end / duration; //缓冲比例
  };

  // 当前播放进度
  videoEvents['timeupdate'] = (ev: any) => {
    // 媒体总长
    const duration = ev.duration || ev.target.duration || 0;
    // 当前媒体播放长度
    const currentTimeNow = ev.currentTime || ev.target.currentTime;
    emits('timeupdate', { currentTime: currentTimeNow, duration });
    //播放进度比例
    state.playProgress = currentTimeNow / duration;
    state.currentTime = timeFormat(currentTimeNow);
    state.totalTime = timeFormat(duration);
  };
  // 播放状态
  videoEvents['playing'] = compose(videoEvents['playing'], () => {
    state.playBtnState = 'pause';
  });
  // 暂停状态
  videoEvents['pause'] = compose(videoEvents['pause'], () => {
    state.playBtnState = 'play';
  });
  // error
  videoEvents['error'] = compose(videoEvents['error'], (ev: Event) => {
    state.loadStateType = 'error';
    //此时的控制按钮应该显示重新播放
    state.playBtnState = 'replay';
  });
  const init = (): void => {
    if (
      state.dVideo.canPlayType(type) ||
      state.dVideo.canPlayType('application/vnd.apple.mpegurl')
    ) {
      if (hls) {
        //解除绑定
        hls.detachMedia();
        state.qualityLevels = [];
      }
      // 解决设置倍速,切换视频后又默认为一倍速的情况
      playbackRate(state.speedActive || '1.0');
      return;
    }
    if (Hls.isSupported()) {
      // 使用hls解码
      hls = new Hls({ fragLoadingTimeOut: 2000 });
      //解除绑定
      hls.detachMedia();
      // 重新绑定video标签
      hls.attachMedia(state.dVideo);
      // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        // video and hls.js are now bound together
        hls.loadSource(src);
        // 加载可用质量级别
        hls.on(Hls.Events.MANIFEST_PARSED, (ev, data) => {
          state.qualityLevels = data.levels || [];
        });
      });
      // 监听错误处理
      hls.on(Hls.Events.ERROR, (ev, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
      // 清晰度正在切换
      hls.on(Hls.Events.LEVEL_SWITCHING, (ev, data) => {
        emits(Hls.Events.LEVEL_SWITCHING, data.level);
      });
      // 清晰度切换成功
      hls.on(Hls.Events.LEVEL_SWITCHED, (ev, data) => {
        state.currentLevel = data.level;
        emits(Hls.Events.LEVEL_SWITCHED, state.currentLevel);
      });
    }
  };
  onMount(() => {
    state.dVideo = refdVideo;
    inputFocusHandle();
  });
  $: if (src) {
    tick().then(() => {
      init();
    });
  }
</script>

{#if state.lightOff}
  <div class="d-player-lightoff" transition:fade />
{/if}
<div
  bind:this={refPlayerWrap}
  id="refPlayerWrap"
  on:mousemove={mouseMovewWarp}
  style={`width:${width};height:${height};--primary-color:rgb(${hexToRgbaColor});--primary-color-end:rgb(${hexToRgbaColorEnd})`}
  class={`d-player-wrap ${state.webFullScreen ? 'web-full-screen' : ''} ${
    state.lightOff ? 'is-lightoff' : ''
  } ${state.playBtnState === 'play' || state.isVideoHovering ? 'd-player-wrap-hover' : ''}`}
>
  <div id="dPlayerVideo" class="d-player-video">
    <video
      bind:this={refdVideo}
      class={`${state.mirror ? 'video-mirror' : ''} d-player-video-main`}
      id="dPlayerVideoMain"
      controls={isMobile && state.canSpeed}
      bind:volume={state.volume}
      muted={state.muted}
      loop={state.loop}
      {playsinline}
      {src}
      {poster}
      {preload}
      webkit-playsinline={playsinline}
      on:loadstart={videoEvents.loadstart}
      on:durationchange={videoEvents.durationchange}
      on:loadedmetadata={videoEvents.loadedmetadata}
      on:loadeddata={videoEvents.loadeddata}
      on:progress={videoEvents.progress}
      on:canplay={videoEvents.canplay}
      on:canplaythrough={videoEvents.canplaythrough}
      on:ended={videoEvents.ended}
      on:error={videoEvents.error}
      on:pause={videoEvents.pause}
      on:play={videoEvents.play}
      on:playing={videoEvents.playing}
      on:seeked={videoEvents.seeked}
      on:seeking={videoEvents.seeking}
      on:stalled={videoEvents.stalled}
      on:timeupdate={videoEvents.timeupdate}
      on:waiting={videoEvents.waiting}
      width="100%"
      height="100%">您的浏览器不支持Video标签。</video
    >
  </div>
  <!-- 全屏模式&&鼠标滑过 顶部显示的内容 -->
  {#if state.fullScreen && title}
    <DPlayerTop {title} />
  {/if}
  <!-- 状态栏 移动端不显示-->
  {#if !isMobile}
    <div class="d-player-state">
      <!-- 页面中心的播放按钮-->
      {#if state.playBtnState === 'play'}
        <div class="d-play-btn" transition:fade>
          <DIcon icon="icon-play" size="30" />
        </div>
      {/if}
    </div>
    <div class="d-player-state-top">
      <!-- 操作信息通知,键盘快进和音量调节 -->
      <DStatus {state} />
    </div>
    {#if state.hasFeedBack && (state.playBtnState === 'play' || state.isVideoHovering)}
      <DFeedbackIcon {nowLanguage} on:feedbackConfirm={feedbackConfirm} />
    {/if}
  {/if}
  <!-- 移动端不显示 -->
  {#if !isMobile}
    <input
      bind:this={refInput}
      type="input"
      readonly={true}
      on:dblclick={() => {
        if (controlBtns.includes('fullScreen')) {
          toggleFullScreenHandle();
        }
      }}
      on:click={togglePlay}
      on:keyup={keypress}
      on:keydown={(ev) => {
        keypress(ev, 'keydown');
      }}
      class="d-player-input"
      maxlength="0"
    />
  {/if}
  <!-- 预加载动画 -->
  <DLoading
    {nowLanguage}
    {loadingText}
    loadType={state.loadStateType}
    on:playHandle={playHandle}
    {loadingDom}
    {loadingImg}
    {loadingType}
  />
  <!-- 鼠标右击出现的弹窗 -->
  <DContextmenu {contextMenu} {nowLanguage} {version} />

  <!-- PC端播放按钮控制器  移动端调用自带控制器-->
  {#if !isMobile && control}
    <!-- content here -->
    <div class="d-player-control" bind:this={refPlayerControl}>
      <!-- 进程 -->
      {#if controlBtns.includes('progress')}
        <div class="d-control-progress">
          <DSlider
            className="d-progress-bar"
            on:onMousemove={onProgressMove}
            on:change={progressBarChange}
            on:update={(val) => {
              state.playProgress = val.detail;
            }}
            on:speedDisabled={speedDisabled}
            disabled={!state.canSpeed}
            hoverText={state.progressCursorTime}
            modelValue={state.playProgress}
            preload={state.preloadBar}
          />
        </div>
      {/if}

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="d-control-tool" on:click={inputFocusHandle}>
        <div class="d-tool-bar">
          <!-- 控制栏的播放和暂停按钮 -->
          <div class="d-tool-item" on:click={togglePlay}>
            <DIcon size="24" icon={`icon-${state.playBtnState}`} />
          </div>
          {#if controlBtns.includes('progressTime')}
            <div class="d-tool-item d-tool-time audioTrack-btn">
              <span>{state.currentTime}</span>
              <span style="margin: 0 3px">/</span>
              <span class="total-time">{state.totalTime}</span>
            </div>
          {/if}
        </div>
        <div class="d-tool-bar">
          <!-- 清晰度 -->
          {#if state.qualityLevels.length && controlBtns.includes('quality')}
            <div class="d-tool-item quality-btn">
              {state.qualityLevels.length &&
                (state.qualityLevels[state.currentLevel] || {}).height}P
              <div class="d-tool-item-main">
                <ul class="speed-main" style="text-align:center">
                  {#each state.qualityLevels as row, index}
                    <li
                      class={state.currentLevel == index ? 'speed-active' : ''}
                      on:click={() => {
                        qualityLevelsHandle(row, index);
                      }}
                    >
                      {row.height}P
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
          <!-- 倍速播放 -->
          {#if controlBtns.includes('speedRate')}
            <div class="d-tool-item speedRate-btn">
              {state.speedActive == '1.0' ? nowLanguage.speed : state.speedActive + 'x'}
              <div class="d-tool-item-main">
                <ul class="speed-main">
                  {#each state.speedRate as row}
                    <li
                      class={state.speedActive == row ? 'speed-active' : ''}
                      on:click={() => {
                        playbackRate(row);
                      }}
                    >
                      {row}x
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
          <!-- 音量 -->
          {#if controlBtns.includes('volume')}
            <div class="d-tool-item volume-btn">
              <div class="d-tool-item-main volume-box" style="width: 52px">
                <div class={`${state.muted ? 'is-muted' : ''} volume-main`}>
                  <span class="volume-text-size">{state.muted ? 0 : ~~(state.volume * 100)}%</span>
                  <!-- @change 如果修改音量则取消静音 -->
                  <DSlider
                    on:change={() => {
                      state.muted = false;
                    }}
                    hover={false}
                    size="5px"
                    vertical={true}
                    modelValue={state.volume}
                    on:update={(val) => {
                      state.volume = val.detail;
                    }}
                  />
                </div>
              </div>
              <span on:click={toggleMuted} style="display: flex">
                <!-- <img src="./asset/img/volume.svg" alt="" width="16" height="16" /> -->
                <DIcon
                  size="20"
                  icon={`icon-volume-${
                    state.volume == 0 || state.muted ? 'mute' : state.volume > 0.5 ? 'up' : 'down'
                  }`}
                />
              </span>
            </div>
          {/if}
          <!-- 设置 -->
          {#if controlBtns.includes('setting')}
            <div class="d-tool-item setting-btn">
              <DIcon size="20" className="rotateHover" icon="icon-settings" />
              <div class="d-tool-item-main">
                <ul class="speed-main">
                  <li>
                    {nowLanguage.mirror}
                    <DSwitch
                      on:change={mirrorChange}
                      modelValue={state.mirror}
                      on:update={(val) => {
                        state.mirror = val.detail;
                      }}
                    />
                  </li>
                  <li>
                    {nowLanguage.loop}
                    <DSwitch
                      on:change={loopChange}
                      modelValue={state.loop}
                      on:update={(val) => {
                        state.loop = val.detail;
                      }}
                    />
                  </li>
                  <li>
                    {nowLanguage.lightOff}
                    <DSwitch
                      on:change={lightOffChange}
                      modelValue={state.lightOff}
                      on:update={(val) => {
                        state.lightOff = val.detail;
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          {/if}
          <!-- 画中画 -->
          {#if controlBtns.includes('pip') && document.pictureInPictureEnabled}
            <div class="d-tool-item pip-btn" on:click={requestPictureInPictureHandle}>
              <DIcon size="20" icon="icon-pip" />
              <div class="d-tool-item-main">{nowLanguage.pictureInPicture}</div>
            </div>
          {/if}
          <!-- 网页全屏 -->
          {#if controlBtns.includes('pageFullScreen')}
            <div
              class="d-tool-item pip-btn"
              on:click={() => {
                state.webFullScreen = !state.webFullScreen;
              }}
            >
              <DIcon size="20" icon="icon-web-screen" />
              <div
                class={`d-tool-item-main  ${!controlBtns.includes('fullScreen') ? 'd-left-0' : ''}`}
              >
                {webFullText}
              </div>
            </div>
          {/if}
          <!-- 全屏 -->
          {#if controlBtns.includes('fullScreen')}
            <div class="d-tool-item fullScreen-btn" on:click={toggleFullScreenHandle}>
              <div
                class={`d-tool-item-main ${
                  state.fullScreen || languageType === 'en' ? 'd-left-0' : ''
                }`}
              >
                {fullText}
              </div>
              <DIcon size="20" icon="icon-screen" />
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="less">
  @import './asset/style/reset.less';
  @import './asset/style/transition.less';
  @import './asset/style/animate.less';
  @import './asset/style/base.less';
  @import './asset/style/vPlayer.less';
  .d-left-0 {
    left: 0 !important;
  }
  .d-player-state-top {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 40px px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5%;
    overflow: hidden;
    z-index: 1;
  }
</style>
