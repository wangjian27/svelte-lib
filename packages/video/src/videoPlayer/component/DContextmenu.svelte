<script lang="ts">
  import { on, off } from '../utils/dom';
  import DSlider from './DSlider.svelte';
  import { fade } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  import { LanguageItem } from '../internationalization/index';
  export let version = '1.0.0';
  export let nowLanguage: LanguageItem;
  export let contextMenu: string[] = ['filter', 'hotkey', 'copy', 'version'];
  const state: Record<string, any> = {
    version,
    show: false,
    dialogType: '',
    dialogTitle: '',
    mouseX: 0,
    mouseY: 0
  };
  const menuListOrigin = [
    { label: nowLanguage.colorAdjustment, key: 'filter' },
    { label: nowLanguage.shortcutKeyInstructions, key: 'hotkey' },
    { label: nowLanguage.copyVideoUrl, key: 'copy' },
    { label: `${nowLanguage.version}：` + version, key: 'version' }
  ];
  $: menuList = menuListOrigin.filter((item: { label: string; key: string }) =>
    contextMenu.includes(item.key)
  );
  const hotkeyList = [
    { key: 'Space', label: '播放/暂停' },
    { key: '→', label: '单次快进10s，长按5倍速播放' },
    { key: '←', label: '快退10s' },
    { key: '↑', label: '音量增加10%' },
    { key: '↓', label: '音量增加降低10%' }
  ];
  const filter = {
    saturate: 0.392,
    brightness: 0.392,
    contrast: 0.392
  };
  let menuStyle;
  $: {
    menuStyle = `left: ${state.mouseX}px;top:${state.mouseY}px`;
  }
  $: {
    const dPlayerVideoMain = document.querySelector('#dPlayerVideo') as HTMLElement;
    if (dPlayerVideoMain) {
      const saturate = (filter.saturate * 2.55).toFixed(2);
      const brightness = (filter.brightness * 2.55).toFixed(2);
      const contrast = (filter.contrast * 2.55).toFixed(2);
      dPlayerVideoMain.style.filter = `saturate(${saturate}) brightness(${brightness}) contrast(${contrast})`;
      dPlayerVideoMain.style[
        '-webkit-filter'
      ] = `saturate(${saturate}) brightness(${brightness}) contrast(${contrast})`;
    }
  }
  const filterReset = () => {
    filter.saturate = 0.392;
    filter.brightness = 0.392;
    filter.contrast = 0.392;
  };
  const keydownHandle = (ev) => {
    // ev.preventDefault()
    if (ev.key == 'Escape') {
      contextmenuHide(0);
    }
  };
  // 显示菜单
  const contextmenuShow = (ev) => {
    ev.preventDefault();
    on(window, 'keydown', keydownHandle); //启用快捷键
    on(window, 'click', contextmenuHide); //启用点击键
    const refPlayerWrap = document.querySelector('#refPlayerWrap');
    on(refPlayerWrap, 'click', contextmenuHide); //启用点击键
    let clientWidth = refPlayerWrap.clientWidth;
    let clientHeight = refPlayerWrap.clientHeight;
    state.mouseX = ev.clientX - refPlayerWrap.getBoundingClientRect().left;
    if (clientWidth - state.mouseX < 130) {
      state.mouseX = state.mouseX + (clientWidth - state.mouseX - 130);
      // state.mouseX = state.mouseX - (clientWidth - state.mouseX)
    }
    state.mouseY = ev.clientY - refPlayerWrap.getBoundingClientRect().top;
    state.show = true;
  };
  // 隐藏菜单
  const contextmenuHide = (ev) => {
    let tagName = ev.path[0].tagName == 'LI';
    let keycode =
      ev.path[0].attributes.dplayerKeyCode && ev.path[0].attributes.dplayerKeyCode.value;
    let hotKeyArr = menuList.map((item) => item.key);
    if (tagName && hotKeyArr.includes(keycode)) {
      state.dialogTitle = ev.path[0].innerText;
      state.dialogType = keycode;
      if (keycode == 'copy') {
        let copyText = document.querySelector('.d-player-copyText') as HTMLInputElement;
        copyText.value = window.location.href;
        copyText.select();
        document.execCommand('copy');
        state.dialogType = '';
      } else if (keycode == 'version') {
        state.dialogType = '';
      }
    }
    state.show = false;
    // 卸载快捷键
    off(window, 'keydown', keydownHandle);
    off(window, 'click', contextmenuHide); //启用点击键
    const refPlayerWrap = document.querySelector('#refPlayerWrap');
    off(refPlayerWrap, 'click', contextmenuHide); //启用点击键
  };
  onMount(() => {
    const refPlayerWrap = document.querySelector('#refPlayerWrap');
    // 卸载快捷键
    off(window, 'keydown', keydownHandle);
    off(window, 'click', contextmenuHide); //启用点击键
    off(refPlayerWrap, 'contextmenu', contextmenuShow);
    // 开启右键菜单
    on(refPlayerWrap, 'contextmenu', contextmenuShow);
  });
  onDestroy(() => {
    const refPlayerWrap = document.querySelector('#refPlayerWrap');
    off(window, 'keydown', keydownHandle);
    off(window, 'click', contextmenuHide); //启用点击键
    off(refPlayerWrap, 'contextmenu', contextmenuShow);
  });
</script>

<div>
  {#if state.dialogType}
    <div class="d-player-dialog" transition:fade>
      <div class="d-player-dialog-body">
        <h5 class="d-player-dialog-title">
          {state.dialogTitle}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <i
            on:click={() => {
              state.dialogType = false;
            }}
            class="icon icon-close">X</i
          >
        </h5>
        <!-- 快捷键说明 -->
        {#if state.dialogType == 'hotkey'}
          <!-- content here -->
          <ul class="d-player-hotkey-panel">
            {#each hotkeyList as item}
              <!-- content here -->
              <li class="d-player-hotkey-panel-item">
                <span>{item.key}</span>
                <span>{item.label}</span>
              </li>
            {/each}
          </ul>
        {/if}
        <!-- 色彩调整 -->
        {#if state.dialogType == 'filter'}
          <ul class="d-player-filter-panel">
            <li class="d-player-filter-panel-item">
              <span>{nowLanguage.saturability}</span>
              <DSlider
                className="d-player-filter-panel-item filter-panel-slider"
                size="5px"
                modelValue={filter.saturate}
                on:update={(val) => {
                  filter.saturate = val.detail;
                }}
              />
              <span>{Math.round(filter.saturate * 255)}</span>
            </li>
            <li class="d-player-filter-panel-item">
              <span>{nowLanguage.brightness}</span>
              <DSlider
                className="d-player-filter-panel-item filter-panel-slider"
                size="5px"
                modelValue={filter.brightness}
                on:update={(val) => {
                  filter.brightness = val.detail;
                }}
              />
              <span>{Math.round(filter.brightness * 255)}</span>
            </li>
            <li class="d-player-filter-panel-item">
              <span>{nowLanguage.contrast}</span>
              <DSlider
                className="d-player-filter-panel-item filter-panel-slider"
                size="5px"
                modelValue={filter.contrast}
                on:update={(val) => {
                  filter.contrast = val.detail;
                }}
              />
              <span>{Math.round(filter.contrast * 255)}</span>
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
              on:click={filterReset}
              title="重置"
              aria-label="重置"
              class="d-player-filter-reset">{nowLanguage.reset}</span
            >
          </ul>
        {/if}
      </div>
    </div>
  {/if}
  {#if state.show}
    <div class="d-player-contextmenu">
      <ul class="d-player-contextmenu-body" style={menuStyle}>
        {#each menuList as item}
          <li dplayerKeyCode={item.key}>{item.label}</li>
        {/each}
      </ul>
      <input class="d-player-copyText" />
    </div>
  {/if}
</div>

<style lang="less">
  @import '../asset/style/reset.less';
  @import '../asset/style/base.less';
  @import '../asset/style/animate.less';
  @import '../asset/style/transition.less';
  .d-player-contextmenu,
  .d-player-dialog {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50px;
    width: 100%;
    z-index: 5;
  }
  .d-player-contextmenu {
    .d-player-copyText {
      opacity: 0;
    }
    .d-player-contextmenu-body {
      position: absolute;
      border-radius: 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.8);
      color: #efefef;
      padding: 0;
      text-align: left;
      min-width: 130px;
      box-sizing: border-box;
      padding: 5px 0;
      li {
        padding: 8px 20px;
        margin: 0;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
  .d-player-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    .d-player-dialog-body {
      background-color: rgba(33, 33, 33, 0.9);
      border-radius: 5px;
      color: #fff;
      min-width: 200px;
      padding: 0 0 10px;
      .d-player-dialog-title {
        text-align: center;
        position: relative;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        padding: 12px 0px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        margin-bottom: 10px;
        .icon-close {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
      }
      // 快捷键说明
      .d-player-hotkey-panel {
        font-size: 12px;
        color: #eee;
        padding-right: 40px;
        .d-player-hotkey-panel-item {
          line-height: 26px;
          span {
            text-align: center;
            display: inline-block;
            width: 120px;
          }
          span:nth-child(2) {
            color: #999;
            width: 160px;
          }
        }
      }
      // 过滤镜
      .d-player-filter-panel {
        width: 320px;
        padding: 0 20px;
        text-align: center;
        .d-player-filter-reset {
          text-align: center;
          cursor: pointer;
          margin-top: 10px;
          padding: 3px 20px;
          display: inline-block;
          border-radius: 2px;
          font-size: 12px;
          background: rgba(133, 133, 133, 0.5);
          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
        .d-player-filter-panel-item {
          height: 32px;
          display: flex;
          align-items: center;
          span {
            font-size: 12px;
            display: block;
            width: 80px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
