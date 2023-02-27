type LanguageVideo =
  | 'speed'
  | 'mirror'
  | 'loop'
  | 'lightOff'
  | 'pictureInPicture'
  | 'webFullScreen'
  | 'exitWebFullScreen'
  | 'fullScreen'
  | 'exitFullScreen'
  | 'colorAdjustment'
  | 'saturability'
  | 'brightness'
  | 'contrast'
  | 'reset'
  | 'shortcutKeyInstructions'
  | 'copyVideoUrl'
  | 'version'
  | 'loading'
  | 'replay'
  | 'playError'
  | 'playStuck'
  | 'progressError'
  | 'videoBlack'
  | 'soundPictueAsync'
  | 'feedbackTips'
  | 'playerFeedBack'
  | 'other'
  | 'feedbackPlaceHolder'
  | 'confirm';
type LanguageItem = Record<LanguageVideo, string>;
type LanguageType = 'zh-cn' | 'en' | 'zh-tw';
type Language = Record<LanguageType, LanguageItem>;
const language = {
  en: {
    speed: 'speed',
    mirror: 'mirror',
    loop: 'loop',
    lightOff: 'light off',
    pictureInPicture: 'picture in picture',
    webFullScreen: 'web fullscreen',
    exitWebFullScreen: 'exit web fullscreen',
    fullScreen: 'fullscreen(f)',
    exitFullScreen: 'exit fullscreen(f)',
    colorAdjustment: 'Color adjustment',
    saturability: 'saturability',
    brightness: 'brightness',
    contrast: 'contrast',
    reset: 'reset',
    shortcutKeyInstructions: 'Shortcut key instructions',
    copyVideoUrl: 'Copy the url address',
    version: 'Version',
    loading: 'loading',
    replay: 'replay',
    playError: 'play error',
    playStuck: 'play stuck',
    progressError: 'The progress bar cannot be dragged',
    videoBlack: 'The video is black but there is sound',
    soundPictueAsync: 'Sound and picture are out of sync',
    feedbackTips: 'Feedback success!',
    playerFeedBack: 'Player problem feedback',
    other: 'other',
    feedbackPlaceHolder: 'Description of the problem in 100 words or less',
    confirm: 'confirm'
  },
  'zh-cn': {
    speed: '倍速',
    mirror: '镜像画面',
    loop: '循环播放',
    lightOff: '关灯模式',
    pictureInPicture: '画中画',
    webFullScreen: '网页全屏',
    exitWebFullScreen: '退出网页全屏',
    fullScreen: '全屏(f)',
    exitFullScreen: '退出全屏(f)',
    colorAdjustment: '视频色彩调整',
    saturability: '饱和度',
    brightness: '亮度',
    contrast: '对比度',
    reset: '重置',
    shortcutKeyInstructions: '快捷键说明',
    copyVideoUrl: '复制网址视频',
    version: '版本',
    loading: '正在缓冲...',
    replay: '重新播放',
    playError: '请求错误',
    playStuck: '播放卡顿',
    progressError: '进度条无法拖动',
    videoBlack: '视频黑屏但有声音',
    soundPictueAsync: '音画不同步',
    feedbackTips: '反馈成功！',
    playerFeedBack: '播放器问题反馈',
    other: '其他',
    feedbackPlaceHolder: '问题描述，限100字内',
    confirm: '确认'
  },
  'zh-tw': {
    speed: '倍速',
    mirror: '鏡像畫面',
    loop: '迴圈播放',
    lightOff: '關燈模式',
    pictureInPicture: '畫中畫',
    webFullScreen: '網頁全屏',
    exitWebFullScreen: '退出網頁全屏',
    fullScreen: '全屏(f)',
    exitFullScreen: '退出全屏(f)',
    colorAdjustment: '視頻色彩調整',
    saturability: '飽和度',
    brightness: '亮度',
    contrast: '對比度',
    reset: '重置',
    shortcutKeyInstructions: '快捷鍵說明',
    copyVideoUrl: '複製網址視頻',
    version: '版本',
    loading: '正在緩衝...',
    replay: '重新播放',
    playError: '請求錯誤',
    playStuck: '播放卡頓',
    progressError: '進度條無法拖動',
    videoBlack: '視頻黑屏但有聲音',
    soundPictueAsync: '音畫不同步',
    feedbackTips: '回饋成功！',
    playerFeedBack: '播放器問題回饋',
    other: '其他',
    feedbackPlaceHolder: '問題描述，限100字內',
    confirm: '確認'
  }
};
export { language };
export type { Language, LanguageType, LanguageItem };
