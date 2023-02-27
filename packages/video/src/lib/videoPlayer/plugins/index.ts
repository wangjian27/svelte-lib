import { State } from '../utils/types';
export const videoEmits: State['loadStateType'][] = [
  // 视频元素开始加载
  'loadstart',
  // 视频长度已经改变
  'durationchange',
  // 视频已经加载
  'loadedmetadata',
  // 当前帧数据可用
  'loadeddata',
  // 视频正在缓存
  'progress',
  // 视频已经准备好播放
  'canplay',
  // 当前视频能不卡顿的播放
  'canplaythrough',
  'play',
  'pause',
  'playing',
  'seeking',
  'seeked',
  'waiting',
  'timeupdate',
  'ended',
  'error',
  'stalled'
];
