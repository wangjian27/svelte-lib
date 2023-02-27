// @ts-ignore
import { DispatchOptions } from 'svelte/internal';

type controlBtn =
  | 'progress'
  | 'progressTime'
  | 'quality'
  | 'speedRate'
  | 'volume'
  | 'setting'
  | 'pip'
  | 'pageFullScreen'
  | 'fullScreen';
interface State {
  width: string;
  height: string;
  color: string;
  colorEnd: string;
  src: string;
  title: string;
  type: string;
  poster: string;
  webFullScreen: boolean;
  canSpeed: boolean;
  currentTime: string;
  playsinline: boolean;
  muted: boolean;
  speedRate: string[];
  autoPlay: boolean;
  loop: boolean;
  mirror: boolean;
  lightOff: boolean;
  volume: number;
  control: boolean;
  controlBtns: controlBtn[];
  // auto - 当页面加载后载入整个视频;meta - 当页面加载后只载入元数据;none - 当页面加载后不载入视频
  preload: 'auto' | 'meta' | 'none';
  //分辨率数组
  qualityLevels: any[];
  dVideo: null | HTMLVideoElement;
  // 播放按钮状态
  playBtnState: 'pause' | 'play' | 'replay';
  // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
  loadStateType:
    | 'loadstart'
    | 'durationchange'
    | 'loadedmetadata'
    | 'loadeddata'
    | 'progress'
    | 'canplay'
    | 'canplaythrough'
    | 'play'
    | 'pause'
    | 'playing'
    | 'seeking'
    | 'seeked'
    | 'waiting'
    | 'timeupdate'
    | 'ended'
    | 'error'
    | 'stalled';
  fullScreen: boolean;
  //当前操作类型,声音,倍速播放
  handleType: '' | 'volume' | 'playbackRate';
  // 当前缓冲进度
  preloadBar: number;
  //总时长
  totalTime: string;
  isVideoHovering: boolean;
  //倍速
  speedActive: string;
  //播放进度
  playProgress: number;
  //是否倍速播放
  isMultiplesPlay: boolean;
  longPressTimeout: null | number;
  progressCursorTime: string; //进度条光标时间
  currentLevel: number; //首选分辨率
  // 是否展示反馈栏目
  isShowFeedBack: boolean;
  // 是否有反馈入口
  hasFeedBack: boolean;
}
// type State = Record<string, any>;
type Emits = <EventKey extends string>(
  type: EventKey,
  detail?: any,
  options?: DispatchOptions
) => boolean;

export type { State, Emits };
