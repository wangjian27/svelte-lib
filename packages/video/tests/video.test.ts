import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Video from '../src/videoPlayer/index.svelte';

describe('video', () => {
  // it('测试基础数据类型', () => {
  //   expect(1 + 1).toBe(2);
  // });
  it('videoComponent', () => {
    render(Video, {
      props: {
        // 是否自动播放
        autoPlay: true,
        // 加载动画使用同花顺logo
        loadingType: 'ths',
        // 加载中的文案
        loadingText: '',
        // 视频地址
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      }
    });
    expect(screen);
  });
});
