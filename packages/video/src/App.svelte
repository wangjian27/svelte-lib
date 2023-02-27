<script lang="ts">
  import MyVideo from './lib/videoPlayer/Index.svelte';
  import { State } from './lib/videoPlayer/utils/types';
  const controlBtns: State['controlBtns'] = [
    'progress',
    'progressTime',
    'speedRate',
    'volume',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ];
  let src =
    'http://172.19.80.103/kongxianglin/event/Public/upload/ques/2023-02/272e42098fd30f4bdcbda5a1013d7c1b.mp4';
  let type = 'video/mp4';
  const loadingDom: string =
    '<div class="logo-loading"><div class="logo"></div><div class="light"></div></div>';
  const loadingImg: string =
    'https://s.thsi.cn/cd/ths-frontend-hxmui-container/front/thsc-hxmui/1.11.0/img/logo_light.ed78645a.png';
  const loadingType: string = 'ths';
  const loadingText: string = '';
  const clickButton = () => {
    type = 'm3u8';
    src =
      'https://1258712167.vod2.myqcloud.com/25121a6avodtransbj1258712167/e8ea5009387702306493120067/drm/voddrm.token.dWluPTE0NDExNTIyMjYwOTM3MDgzMztleHQ9M2QwNDY1ODg1NGU3YjA1OTEyN2QzOTRiOTg5MzY3ZGM1YzlkOGYyMjQ5NzFkYWVlMjM1OTJkMzk3MzZmYTdmNzM4YmNkYzc0NWYwMzQ4ZGQxMDdkMDdkOGY4MGUwMDAwNzQxYjRmNjFiMDM0ODQ3ODEwZjU0MWY3MDlmYTU0ZmU5NjlkYWFhZDY1YjQ3ZWViO3VpZF90eXBlPTI7dWlkX29yaWdpbl91aWRfdHlwZT0yO3VpZF9vcmlnaW5fYXV0aF90eXBlPTI7dWlkX2FwcGlkPTE0MDAwMDAwMDg7Y2lkPTU4OTI2ODk7dGVybV9pZD0xMDYxMDk5NzE7dm9kX3R5cGU9MDtwbGF0Zm9ybT0z.v.f30742.m3u8?exper=0&sign=c7563e4371df07c7cd6db9a1ef9987c1&t=63D23858&us=6220076889876114108';
  };
  const hasFeedBack: boolean = true;
  const hlsLevelSwitching = () => {
    console.log('hlsLevelSwitching');
  };
  const hlsLevelSwitched = () => {
    console.log('hlsLevelSwitched');
  };

  const speedDisabled = (data: CustomEvent<number>) => {
    // console.log(data.detail);
  };
  const timeupdate = (data) => {
    // console.log(data.detail);
  };
  const jump = () => {
    window.location.href = 'https://www.baidu.com';
  };
  const canplay = (data) => {
    // console.log(data.detail);
  };
</script>

<main>
  <MyVideo
    {src}
    {type}
    {hasFeedBack}
    {loadingText}
    languageType="zh-cn"
    autoPlay={true}
    {controlBtns}
    {loadingType}
    canSpeed={true}
    title="这是标题"
    on:canplay={canplay}
    on:timeupdate={timeupdate}
    on:speedDisabled={speedDisabled}
    on:hlsLevelSwitching={hlsLevelSwitching}
    on:hlsLevelSwitched={hlsLevelSwitched}
  />
  <button on:click={clickButton}>切换m3u8视频源</button>
</main>

<style lang="less">
</style>
