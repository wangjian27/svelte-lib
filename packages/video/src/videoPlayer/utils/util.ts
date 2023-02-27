export const componentName: '[videoPlayer]' = '[videoPlayer]';
// hex转rgb
export const hexToRgba = (hex: string) => {
  return `${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt(
    '0x' + hex.slice(5, 7)
  )}`;
};
export const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
// 电影时间格式化
export const timeFormat = (time: number) => {
  let hh: any = ~~(time / 3600);
  let mm: any = ~~((time % 3600) / 60);
  //取整
  let ss: any = ~~(time % 60);
  //个位数补0
  hh = hh < 10 ? '0' + hh : hh;
  //个位数补0
  mm = mm < 10 ? '0' + mm : mm;
  //个位数补0
  ss = ss < 10 ? '0' + ss : ss;
  return `${hh}:${mm}:${ss}`;
};
// 是否是移动端
export const isMobile = !!('ontouchstart' in window);
// 全屏模式
export const toggleFullScreen = (el: HTMLElement) => {
  //如果当前是全屏状态，就退出全屏，否则进入全屏状态
  let documentEL = document as any;
  //获取当前的全屏状态
  let isFullscreen = documentEL.webkitIsFullScreen || documentEL.fullscreen;
  if (!isFullscreen) {
    // @ts-ignore
    const inFun = el.requestFullscreen || el?.webkitRequestFullScreen;
    //让当前播放器进入全屏状态
    inFun.call(el);
  } else {
    const exitFun = document.exitFullscreen || documentEL.webkitExitFullScreen;
    //退出全屏状态要使用document
    exitFun.call(documentEL);
  }
  return !isFullscreen;
};
export const eventPathPolyfill = () => {
  Object.defineProperty(Event.prototype, 'path', {
    get() {
      return this.composedPath();
    }
  });
};
