<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { LanguageItem } from '../internationalization/index';
  import { Emits } from '../utils/types';
  const eimts: Emits = createEventDispatcher();
  const LOAD_TYPE = ['loadstart', 'loadStateType', 'waiting', 'ended', 'error', 'stalled'];
  export let nowLanguage: LanguageItem;
  export let loadType: string = nowLanguage.loading;
  export let loadingText: string = '';
  export let loadingDom: string = '';
  export let loadingImg: string = '';
  export let loadingType: string = '';
  let loadingStyle: string = '';
  const replayHandle = () => {
    // 取出视频空间重新播放
    eimts('playHandle');
  };
  $: {
    let style = 'background: rgba(0, 0, 0, .1);z-index:1';
    if (loadType === 'loadstart') {
      style = 'background: rgba(0, 0, 0, 1);;z-index:3';
    }
    loadingStyle = style;
  }
</script>

{#if LOAD_TYPE.includes(loadType)}
  <div class="d-loading" style={loadingStyle}>
    <div>
      <!-- 初始化加载 ,缓冲中-->
      {#if ['loadstart', 'waiting'].includes(loadType)}
        <span>
          {#if loadingDom}
            {@html loadingDom}
          {:else if loadingImg}
            <img src={loadingImg} alt="" class="rotating f50 loading-img" />
          {:else if loadingType === 'ths'}
            <div class="d-logo-loading">
              <div class="d-logo" />
              <div class="d-light" />
            </div>
          {:else}
            <i class="rotating iconfont icon-loading f50" />
          {/if}
          <p>{loadingText}</p>
        </span>
      {/if}
      <!-- 播放结束 -->
      {#if loadType == 'ended'}
        <span>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p on:click={replayHandle} class="d-flex-x d-pointer">
            <i class="iconfont icon-replay f24 mr5" />{nowLanguage.replay}
          </p>
        </span>
      {/if}
      <!-- 播放错误 -->
      {#if loadType == 'error' || loadType == 'stalled'}
        <span>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p on:click={replayHandle} class="d-flex-x d-pointer">
            <i class="iconfont icon-replay f24 mr5" />{nowLanguage.playError}
          </p>
        </span>
      {/if}
    </div>
  </div>
{/if}

<style lang="less">
  @import '../asset/style/iconfont.css';
  @import '../asset/style/reset.less';
  @import '../asset/style/base.less';
  @import '../asset/style/animate.less';
  @import '../asset/style/transition.less';
  .f50 {
    font-size: 50px;
  }
  .f24 {
    font-size: 24px;
  }
  .d-loading {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    color: #efefef;
    text-align: center;
    font-size: 13px;
  }
  .loading-img {
    width: 50px;
  }
  .d-logo-loading {
    position: relative;
    width: 100px;
    height: 23px;
    overflow: hidden;
    .d-logo {
      width: 100%;
      height: 100%;
      background: url(https://s.thsi.cn/cd/ths-frontend-hxmui-container/front/thsc-hxmui/1.11.0/img/logo_light.ed78645a.png)
        50%;
      background-size: cover;
    }
    .d-light {
      position: absolute;
      left: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 32px;
      height: 23px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABaCAMAAAB0UnP8AAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAALHRSTlMABAgVDx4uDCU9ODMZKUJcRiFWYGZKt06ojpeJUq95bmqzo6CTfYRydaybgZ4JNUQAAAd9SURBVGjejNWNVtpAEIbhpoECGii/ojUCapEU7v/++s27ux23kMTxHH/O0Tx+Mzubb7eqsPquGo0Gg0FZllVVDYeLxVg1/VT6cbEYqqqqVOl3RyP7M/7+W2sV9gEhYARQBoDH/6Du9aFCWaBgOIFRtBqhsgwhAcD9p0KxaG4I8RhFWwqAIglEIAGPv7OaUPomMo440dUrD5FlCAHS4x2JxiIRg55peApCIDAGixD+/dlsNg+l76QIoV0YnqNzGP+HUJdcANiEckRBPIcTrRk8RIlABrVICXj8drutrfTVFBAZlqOqaFXPNAoqaxMZSABQ10vKEKLIULOmjDyLgdA3CQQyAITn/0wVFBnkwPBWdaZwgjZNp2QgQgBWoWQsZcQctMqJzhTXIciw2ZBgtVqnQhGiZmVGd6e8TwhVGISOknUpAgfVfr/XZynB2MzsXEEEA6JNcMJPUxBqBHv8iTJFSWQwDyc6O5UJEC5oCAL2+6bZhWqaE0hmiKi8U719KodD3RsQZFCTlEDC0UqIjJTDY1R9nYLwYVsIFw4C9PzLh9XlIqY5HQ6r1XL5L8aCgXenyE+sEZOJ2uSCgGdKyG5nORRju82JQSuRnyefRBIUQc9/okCOyag3ED/GGaFqSeFEnARtsgwXhN8qIWbYPAKh3fgKgaAaiAiT+EGIIGjOHwC/rEx5/mAca02DTokYc0+1EoUTPuxAqE3M4RkhGiJsHGEadAqi6iAYRTbs+3vbiZoQEizDr/P5XXU+C7EYx2a/XkMw70RgdBJcTyEEx8lCkAHhDYQcl6M6BTHvJ/Ijm/oUFpsQCAZQGEyDTtXajK+myM4Tk6gV4tQcLwgCHqlgcKhaCGbRsRUKARGHbSGeIBAwiGHE/hCISR9RXB9ZNrteatiEiMIfymKETt0g2ra7yAhWmxBGxEm8v5vw8vIiQsZtovxEFD2rzXlKfUohBFB/6FRG3OUperdiHIma8xT7pDbp6a+vbUR/CifoE0e2ZilsJ1KIVxXEW06k7ZbQmyKN4u4uHVkR9EmTQPgyUXRsBcRkPqdPzc6GbSEQMGzeELvG7loukOymbdmKIp+2H9mPZ44TxMPDA0RIYXuhC6SFKNoWr6riVtCndTxPCoGQEWy3EZzZzhTFrT5N0pG92LDfIAQ4wXaf1hAcqKsUvRfUtpN4zwh/d0v4SgqOrIg4iicRCBlh1yDvC3uxQkiAuH3PBiEjwpGFYBSEyImLESsRs0SUbYSfJ67ZeEHVSxHqk4hzIijbC12DTyJO/4g0CvrU/a5gt7nI2QobBXvnBKvH/cEbScRcxNVVfkO42gpu2RNbEUI48fjItEXYbjPtSAw8RRcxdYLFy0cBwShE7J0YQ9y+PopEIFTxDoxb0VyPgmmfbdp+fYjovz4gfPEi8bdSc1ttI4qh6ENbqKF1ZojBLZi0BOqG/P8HRmeNthVFntFknvy2kHS2rn5xVRghhcLTB/0HiCq8akUtRw/DT0u0UyhCeGpxXNs/QKyrAgRlG4Sr4kmhwAi+LDxrNxFeowoQqYMSwnIgofh1H/FfCIWi1TZ+CuE9UrYpeIQiCPZkibYhHqQKQ3wp0S5WpGgbwsu21QoQJRSoAoTq9tdAtKoAQQcVwst++q2i6pl8BoHwunIEgop3qgjlwFcQRPt8PoJoy1F0Bo4YqjiRAzMiiqoq3nlvUc0j3lEItF0QWXgHot1akUc89csgqHiOiFpBmj0tCYpod+UoI0LbSh9C0EPRlUt4F6miIgKwibgGgk9PlhYKxDRt+4kvDxZeLFRUQZAFIUh3JCg9WRC5M8hJcC8CgiPGuJob5rmqolphBCGOCcGLUk9Op8kkuWQPjcNpT7S2NFCGKog6WPCeeLKlHLVWZATiRnrPMR4xgXlN9VZToaBW7LPi8BFxG/I0R0YHJVUI0VhREai7TqqWn/BTWn7UJ9vHgsp9pYsS4zmM4MkK0aoCwj3E1taALFtG+p0IdEGO0trAGPYNAARN9IZQM5ubNCAN4gjCMoibwX7FCeYmjNC4rVqxJbwci5i48dRTXUMZwYxQsMNP9clWRF5+0B683FumuRF6T/2TLT2zth+YoZUgO8FYCa5tHbsdc906stgcDG02sYHFZvipZo/yZcSsnaCWpxYOg/BdiYMIUrZ6j2pFfVKB4NlaNB7/Eo5/BrHPAEG4xEIQRKiiWc++WwFr28+mXKtyA9gAGQQlj1RTy5eWgqGMSbvywYiF/x9swE0RCSHWrcjb+M9eLZoVM58QBEOeujHGWWE5vQDABOvPRlcgTRREdwab/W5xmMRIJyQDXC523Smnl3hPzd0Chm5503TmDhZnMAOYk4aXILCTCMKaKgridqY66JoXxzy/5mFDNaKzQoxv9qi4GMKoN8kBwAapLkSxaYWkERF3OwYkDqs6esoG3EQxam7Q9QLtJ+7V8/BigySRZLfjtCoGh3og+cgdhJlA7D9yw8BVYpizgORbvf4P8B0vJSPaU312lYXcPhgBsR9O4M8TEp1iLSvaRwUDyDyv/m8i2RCxLoCqjRwPvKW/f+j7KYAIDeIN31OsfyvZzREAAAAASUVORK5CYII=)
        50%;
      background-size: cover;
      opacity: 0.6;
      -webkit-animation: move 0.8s ease-in-out infinite;
      animation: move 0.8s ease-in-out infinite;
    }
  }
  @keyframes move {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
</style>
