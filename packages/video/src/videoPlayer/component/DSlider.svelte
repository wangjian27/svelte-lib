<script lang="ts">
  import { on, off } from '../utils/dom';
  import { createEventDispatcher } from 'svelte';
  const emits = createEventDispatcher();
  export let modelValue: number = 0;
  export let disabled: boolean = false;
  export let vertical: boolean = false;
  // 鼠标hover位置
  export let hover: boolean = false;
  export let hoverText: string = '';
  export let preload: number = 0;
  export let size: string = '10px';
  export let className: string = '';
  interface State {
    dragging: boolean;
    hoverPosition: number;
    hoverTipsLeft: string;
  }
  const state: State = {
    dragging: false, //拖拽状态
    hoverPosition: 0, //鼠标位置
    hoverTipsLeft: '50%' //提示偏移位置
  };
  let refSlider: HTMLElement;
  let refTips: HTMLElement;
  // 获取当前位置的高度或宽度
  $: sliderBarStyle = (() => {
    let value = modelValue < 0 ? 0 : modelValue > 1 ? 1 : modelValue;
    return vertical ? `height:${value * 100}%` : `width:${value * 100}%`;
  })();
  // 预加载进度条样式
  $: preloadStyle = (() => {
    let value = preload < 0 ? 0 : preload > 1 ? 1 : preload;
    return vertical ? `height:${value * 100}%` : `width:${value * 100}%`;
  })();
  //hover样式
  $: hoverStyle = (() => {
    let value = state.hoverPosition < 0 ? 0 : state.hoverPosition > 1 ? 1 : state.hoverPosition;
    return vertical ? `bottom:${value * 100}%` : `left:${value * 100}%`;
  })();
  // 阻止右键事件
  const contextmenuHandle = (ev: MouseEvent) => {
    ev.preventDefault();
  };
  // 按下事件
  const mouseDownHandle = (ev: MouseEvent) => {
    if (disabled) {
      const value: number = getPosition(ev);
      emits('speedDisabled', value);
      return;
    }
    ev.preventDefault();
    state.dragging = true;
    setPosition(ev); //设置当前位置
    on(window, 'mousemove', onDragging);
    on(window, 'touchmove', onDragging);
    on(window, 'mouseup', onDragEnd);
    on(window, 'touchend', onDragEnd);
  };
  const mouseenterFn = () => {
    hover = true;
  };
  const mouseLeaveFn = () => {
    hover = false;
  };
  // 鼠标移动事件
  const mousemoveHandle = (ev: MouseEvent) => {
    if (!hover) return;
    let val: number = getPosition(ev);
    emits('onMousemove', { ev, val });
    state.hoverPosition = val;
    if (vertical) return;
    // console.log(ev, ev.clientX);
    //获取dom
    let refSliderEl = refSlider as HTMLButtonElement;
    // 提示宽的一半宽度
    let refTipsWidth = (refTips as HTMLButtonElement).clientWidth / 2;
    let movePositon = ev.clientX - refSliderEl.getBoundingClientRect().left;
    // 如果当前往左的偏移量大于提示框宽度
    if (movePositon < refTipsWidth) {
      state.hoverTipsLeft = refTipsWidth - movePositon + 'px';
    } else if (refSliderEl.clientWidth - movePositon < refTipsWidth) {
      // 如果当前往右的偏移量大于提示框宽度  （总宽度-当前移动位置）< tips一半的宽度
      state.hoverTipsLeft = refSliderEl.clientWidth - movePositon - refTipsWidth + 'px';
    } else {
      state.hoverTipsLeft = '50%';
    }
  };
  // 设置位置
  const setPosition = (ev: Event) => {
    let value: number = getPosition(ev);
    emits('update', value);
    emits('change', { ev, value });
  };
  // 获取当前事件位置
  const getPosition = (ev: any) => {
    //获取dom
    let refSliderEl = refSlider as HTMLButtonElement;
    let value = 0;
    if (vertical) {
      // 垂直模式下获取高度
      let clientHeight = refSliderEl.clientHeight;
      value = (refSliderEl.getBoundingClientRect().bottom - ev.clientY) / clientHeight;
    } else {
      value = (ev.clientX - refSliderEl.getBoundingClientRect().left) / refSliderEl.clientWidth;
    }
    return value < 0 ? 0 : value > 1 ? 1 : value;
  };
  // 拖拽中
  const onDragging = (ev: Event) => {
    setPosition(ev); //获取当前按下位置
  };
  // 拖拽结束
  const onDragEnd = (ev: Event) => {
    if (state.dragging) {
      off(window, 'mousemove', onDragging);
      off(window, 'touchmove', onDragging);
      off(window, 'mouseup', onDragEnd);
      off(window, 'touchend', onDragEnd);
      off(window, 'contextmenu', onDragEnd);
      setTimeout(() => {
        state.dragging = false;
      }, 0);
    }
  };
</script>

<div
  on:mousedown|stopPropagation={mouseDownHandle}
  on:contextmenu={contextmenuHandle}
  bind:this={refSlider}
  class={`d-slider ${vertical ? 'is-vertical' : ''} ${className}`}
>
  <div
    class="d-slider__runway"
    on:mousemove={mousemoveHandle}
    on:mouseleave={mouseLeaveFn}
    on:mouseenter={mouseenterFn}
    style={vertical ? 'width:' + size : 'height:' + size}
  >
    <div class="d-slider__cursor" style={`${hoverStyle}; display:${hover ? 'block' : 'none'}`}>
      <div
        class="d-slider__tips"
        bind:this={refTips}
        style={`left:${state.hoverTipsLeft};display:${hoverText ? 'block' : 'none'}`}
      >
        {hoverText}
      </div>
    </div>
    <div class="d-slider__preload" style={preloadStyle} />
    <div class="d-slider__bar" style={sliderBarStyle} />
  </div>
</div>

<style lang="less">
  .d-slider {
    position: relative;
    .d-slider__runway {
      width: 100%;
      // height: v-bind(size);
      background-color: #333333;
      position: relative;
      cursor: pointer;
      vertical-align: middle;
      .d-slider__cursor,
      .d-slider__preload,
      .d-slider__bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
      .d-slider__cursor {
        display: none; //TODO
        z-index: 1;
        width: 1px;
        background: #fff;
        pointer-events: none;
        .d-slider__tips {
          pointer-events: none;
          color: #fff;
          position: absolute;
          white-space: nowrap;
          z-index: 2;
          bottom: 14px;
          left: 50%;
          padding: 4px;
          box-sizing: border-box;
          display: block;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 3px;
          transform: translateX(-50%);
        }
      }
      &:hover .d-slider__cursor {
        display: block;
      }
      .d-slider__preload {
        // border-radius: 10px;
        background-color: #717171;
      }
      .d-slider__bar {
        // border-radius: 10px 0 0 10px;
        background: linear-gradient(
          to right,
          var(--primary-color) 0%,
          var(--primary-color-end) 80%,
          var(--primary-color-end) 100%
        );
        // background: var(--primary-color);
        &::before {
          display: block;
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          width: 5px;
          height: 5px;
          transition: 0.2s;
          transform: translateY(-50%) scale(1, 1);
          border-radius: 50%;
          background: #fff;
          border: 5px solid var(--primary-color);
        }
      }
    }
    // 垂直模式
    &.is-vertical {
      height: 100px;
      display: inline-block;
      .d-slider__runway {
        position: relative;
        height: 100%;
        // width: v-bind(size);
        margin: 0 6px;
        .d-slider__preload,
        .d-slider__bar,
        .d-slider__cursor {
          bottom: 0;
          top: auto;
          width: 100%;
        }
        .d-slider__cursor {
          height: 1px;
        }
        .d-slider__bar {
          &::before {
            top: -6px;
            left: 50%;
            width: 5px;
            height: 5px;
            transform: translateX(-50%) scale(1, 1);
          }
        }
      }
    }
  }
  .d-progress-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    transition: height 0.1s;
    height: 3px;
    z-index: 1;

    // pointer-events: none;
    //对 d-slider内的组件样式修改
    .d-slider__runway {
      // border-radius: 10px;
      transition: height 0.1s;
      height: 100% !important;

      .d-slider__bar::before {
        transform: translateY(-50%) scale(0, 0);
      }
    }
  }

  .d-progress-bar:hover {
    height: 100%;

    .d-slider__bar::before {
      transform: translateY(-50%) scale(1, 1) !important;
    }
  }

  .d-player-filter-panel-item {
    .d-slider__runway {
      background-color: #999;
      .d-slider__bar:before {
        width: 5px;
        height: 5px;
      }
    }
  }
  .filter-panel-slider {
    width: 100%;
  }
</style>
