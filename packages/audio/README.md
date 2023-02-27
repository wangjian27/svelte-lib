# 【前端】语音播放组件

## 业务需求背景

- 1.文字转语音功能，在多场景下满足用户需求，让用户对文章内容摄取上有多种的方式
- 2.公司创新组已经实现相关功能，但没有单独针对此功能的组件，并且当前创新组组件有bug未修复
- 3.所以为了之后的业务方更好的接入语音功能，开发此公用组件，以达到开箱即用的、不受框架限制的组件

## 使用方式

- 1.引入cdn
  - <https://s.thsi.cn/cd/b2cweb-fe-common-resource-pod/js/audiocomponent/1.0.0/audiocomponent.min.js>
- 2.创建实例

  ```javascript
  const audioComponent = new window.svelteSdk.AudioComponent({
    // 目标dom
    target: document.querySelector('#audio-component'),
    props: {
      // 文章唯一seq
      seq: '',
      // 标题内容
      title: '标题内容',
      // 具体内容
      content: '',
      // 页面展示的按钮内容
      btnText: '听财经',
      // 埋点id
      statPageId: 'ssnc_zttz',
    },
  });
  audioComponent.$on('ondisplay', () => {
    console.log('ondisplay');
  });

  audioComponent.$$set({ seq: '15fe5378de05f001_tcwj-3121'})
  ```

- 3.黑夜模式依赖ths-theme.min.js

## 参数说明

### Props

| 参数        | 是否必填 | 说明                                         | 类型        | 默认值 |
| ----------- | -------- | -------------------------------------------- | ----------- | ------ |
| target      | 是       | 样式的容器                                   | HTMLElement | null   |
| seq   | 是       | 语音播放的 seq                               | string      | ''     |
| title | 是       | 语音的标题                                   | string      | ''     |
| content     | 是       | 语音的内容，用以计算时长和传入客户端协议播放 | string      | ''     |
| btnText     | 否       | 按钮的内容                                   | string      | ''     |
| statPageId  | 否       | 操作的埋点，不传则埋点不生效                 | string      | ''     |

### Events

| 事件名     | 说明         | 参数 |
| ---------- | ------------ | ---- |
| onplayover | 播放完毕触发 | --   |
| ondisplay  | 开始播放触发 | --   |
| onpause    | 暂停播放触发 | --   |
| oncontinue | 继续播放触发 | --   |
