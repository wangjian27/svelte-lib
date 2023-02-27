# 【前端】pc 播放器组件

## 使用方式

- 1.创建实例

```javascript
import VideoPlayer from 'no-framework-video-player';
const videoPlayer = new VideoPlayer({
  target: document.getElementById('video'),
  props: {
    // 是否自动播放
    autoPlay: true,
    // 加载动画使用同花顺logo
    loadingType: 'ths',
    // 加载中的文案
    loadingText: '',
    // 视频地址
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  }
});
// 响应式的修改视频播放器的信息
videoPlayer.$$set({
                type: 'm3u8',
                controlBtns: [
                    'progress',
                    'progressTime',
                    'speedRate',
                    'volume',
                    'setting',
                    'pip',
                    'pageFullScreen',
                    'fullScreen',
                ],
                src: 'https://apd-65f952198b079d44ae6259b57f149420.v.smtcdns.com/mv.music.tc.qq.com/Agxi661cQ4dgUk-YYtb57kQOV8qAfhzk9PkGL63aI2Ww/B31668EF2AF834F7B39B8C23AF46A9E333AF1EEB77436A8323B92B4761AC524A14D71B884B41ED1E42D708A610FD2A9EZZqqmusic_default/qmmv_0b53q4aaoaaapeaagbl6yvrvjbyaa6dqab2a.f9944.m3u8'
            })
// 监听视频开始加载
videoPlayer.$on('loadstart', () => {
  console.log('loadstart');
});
// 监听视频播放的当前时间改变
videoPlayer.$on('timeupdate', ({ detail }) => {
  console.log(detail.currentTime, detail.duration);
});
```

## 参数说明

| 参数          | 是否必填 | 说明                                                                                                              | 类型                                                                                                 | 默认值                                                                                      |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| projectName   | 是       | 记录项目名称，用以统计组件使用情况，并且异常上报的时候做检索用                                                    | string                                                                                               | ''                                                                                          |
| src           | 是       | 视频源地址                                                                                                        | string                                                                                               | ''                                                                                          |
| languageType  | 否       | 国际化，目前支持三种语言，简体中文\|繁体中文\|英文                                                                | 'zh-cn'\|'zh-tw'\|'en'                                                                               | 'zh-cn'                                                                                     |
| width         | 否       | 视频宽度                                                                                                          | string                                                                                               | '800px'                                                                                     |
| height        | 否       | 视频高度                                                                                                          | string                                                                                               | '450px'                                                                                     |
| color         | 否       | 播放器整体色彩                                                                                                    | string                                                                                               | '#E93030'                                                                                   |
| colorEnd      | 否       | 播放器进度条和声音控制栏渐变色彩尾部                                                                              | string                                                                                               | '#F06F6F'                                                                                   |
| title         | 否       | 当前视频的标题，如果传入则会在全屏显示的时候显示在左上角                                                          | string                                                                                               | ''                                                                                          |
| type          | 否       | 当前视频使用什么类型播放，默认支持 mp4 类型                                                                       | 'video/mp4'\|'m3u8'                                                                                  | 'video/mp4'                                                                                 |
| poster        | 否       | 视频封面信息，不传默认使用第一帧视频                                                                              | string                                                                                               | ''                                                                                          |
| webFullScreen | 否       | 默认是否是网页全屏                                                                                                | boolean                                                                                              | false                                                                                       |
| canSpeed      | 否       | 是否支持改变进度                                                                                                  | boolean                                                                                              | true                                                                                        |
| currentTime   | 否       | 从哪个时间点开始播放，单位是秒                                                                                    | number                                                                                               | 0                                                                                           |
| muted         | 否       | 是否静音                                                                                                          | boolean                                                                                              | false                                                                                       |
| speedRate     | 否       | 播放倍速                                                                                                          | string[]                                                                                             | ['2.0', '1.5', '1.25', '1.0', '0.75', '0.5']                                                |
| autoPlay      | 否       | 是否默认播放，如果设置了 true，如果当前页面没有交互，会静音自动播放                                               | boolean                                                                                              | false                                                                                       |
| loop          | 否       | 默认是否循环播放                                                                                                  | boolean                                                                                              | false                                                                                       |
| mirror        | 否       | 默认是否镜像                                                                                                      | boolean                                                                                              | false                                                                                       |
| lightOff      | 否       | 默认是否关灯                                                                                                      | boolean                                                                                              | false                                                                                       |
| volume        | 否       | 默认音量                                                                                                          | number                                                                                               | 1                                                                                           |
| control       | 否       | 是否显示控制器                                                                                                    | boolean                                                                                              | false                                                                                       |
| controlBtns   | 否       | 具体显示某几个控制器,分别为进度条\|进度时间\|视频质量(mp4 视频不会显示)\|速度控制\|声音控制\|设置\|画中画\|网页全屏\|全屏 | 'progress'\|'progressTime'\|'quality'\|'speedRate'\|'volume'\|'setting'\|'pip'\|'pageFullScreen'\|'fullScreen'[] | ['progress','progressTime','quality','speedRate','volume','setting','pip','pageFullScreen','fullScreen'] |
| preload       | 否       | 是否预加载                                                                                                        | 'auto'\|'metadata'\|'none'                                                                           | 'auto'                                                                                      |
| qualityLevels | 否       | 分辨率数组，mp4 视频不会显示                                                                                      | string[]                                                                                             | []                                                                                          |
| contextMenu   | 否       | 右键弹出内容，滤镜\|热键信息\|复制网址\|版本信息                                                                  | 'filter'\|'hotkey'\|'copy'\|'version'[]                                                              | ['filter', 'hotkey', 'copy', 'version']                                                     |
| loadingDom    | 否       | 加载中的 dom，供业务方写自己的 dom 进行渲染                                                                       | string                                                                                               | ''                                                                                          |
| loadingImg    | 否       | 加载中的图片                                                                                                      | string                                                                                               | ''                                                                                          |
| loadingType   | 否       | 加载中使用的类型。如果业务方需要修改加载中的动画，只能选择一种方式进行修改                                        | 'ths'\|'default'                                                                                     | 'default'                                                                                   |
| loadingText   | 否       | 加载中的文案                                                                                                      | string                                                                                               | '正在缓冲...'                                                                               |
| hasFeedBack   | 否       | 是否需要有反馈入口                                                                                                | boolean                                                                                              | false                                                                                       |

## Events

| 事件名            | 说明                                                               | 参数                                                   |
| ----------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| feedbackConfirm   | 反馈弹框点击确认，返回用户反馈选择了什么和他输入了什么反馈内容     | detail:{feedbackOptions:string[],feedbackValue:string} |
| speedDisabled     | 当设置了不能调整进度用户调整进度时触发，返回用户点击的时间是第几秒 | detail:number                                          |
| mirrorChange      | 镜像切换触发，返回当前是否打开镜像                                 | detail:{mirrorStatus:boolean}                          |
| loopChange        | 视频循环开启关闭，返回是否开启                                     | detail:{loopStatus:boolean}                            |
| lightOffChange    | 开关灯，返回是否处于开灯状态                                       | detail:{lightOffStatus:boolean}                        |
| loadstart         | 加载开始                                                           | detail:{currentTime:number,duration:number}            |
| waiting           | 等待中                                                             | detail:{currentTime:number,duration:number}            |
| ended             | 播放结束                                                           | detail:{currentTime:number,duration:number}            |
| error             | 播放错误                                                           | detail:{currentTime:number,duration:number}            |
| stalled           | 数据不可用                                                         | detail:{currentTime:number,duration:number}            |
| progress          | 加载资源                                                           | detail:{currentTime:number,duration:number}            |
| canplay           | 视频能够播放                                                       | detail:{videoDom:HTMLVideoElement,duration:number}            |
| canplaythrough    | 视频能够不缓冲播放                                                 | detail:{currentTime:number,duration:number}            |
| durationchange    | 视频长度改变                                                       | detail:{duration:number}            |
| loadeddata        | 视频加载完数据                                                     | detail:{currentTime:number,duration:number}            |
| loadedmetadata    | 视频的元数据已加载                                                 | detail:{currentTime:number,duration:number}            |
| pause             | 暂停                                                               | detail:{currentTime:number,duration:number}            |
| play              | 播放                                                               | detail:{currentTime:number,duration:number}            |
| playing           | 开始播放                                                           | detail:{currentTime:number,duration:number}            |
| seeked            | 当用户已移动/跳跃到视频中的新位置时触发                            | detail:{currentTime:number,duration:number}            |
| seeking           | 当用户开始移动/跳跃到视频中的新位置时触发                          | detail:{currentTime:number,duration:number}            |
| timeupdate        | 当目前的播放位置已更改时触发                                       | detail:{currentTime:number,duration:number}            |
| hlsLevelSwitching | mp4 视频不会触发，清晰度切换开始时触发，返回当前正在切换的清晰度   | detail:number                                          |
| hlsLevelSwitched  | mp4 视频不会触发，清晰度切换完成时触发，返回当前正在切换的清晰度   | detail:number                                          |
