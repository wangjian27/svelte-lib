<script lang="ts">
  import { State } from '../utils/types';
  import DIcon from './DIcon.svelte';
  export let state: State;
</script>

{#if state.handleType || state.isMultiplesPlay}
  <div class="d-status">
    {#if state.handleType == 'volume'}
      <li class="d-flex-center">
        <DIcon
          size="18"
          className="d-status-icon"
          icon={`icon-volume-${state.volume == 0 ? 'mute' : state.volume > 0.5 ? 'up' : 'down'}`}
        />
        {~~(state.volume * 100)}%
      </li>
    {/if}
    {#if state.handleType === 'playbackRate' || state.isMultiplesPlay}
      <li class="d-flex-center">
        <d-icon size="12" icon="icon-play" />
        <d-icon size="12" icon="icon-play" style="margin-right:5px" />5X速播放中
      </li>
    {/if}
  </div>
{/if}

<style lang="less">
  @import '../asset/style/base.less';
  .d-status {
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.8);
    padding: 0 8px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.95);

    .d-status-icon {
      width: 24px !important;
      display: inline-block;
      margin-right: 5px;
    }
  }
</style>
