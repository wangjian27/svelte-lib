<script lang="ts">
  import DRadio from './DRadio.svelte';
  import Toast from './Toast.svelte';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { LanguageItem } from '../internationalization/index';
  const emit = createEventDispatcher();
  export let isShow = false;
  export let nowLanguage: LanguageItem;
  const isCheckedSet = new Set([]);
  let textValue: string = '';
  let toastIsShow: boolean = false;
  const closeIsShow = () => {
    toastIsShow = false;
  };
  const closeFeedBack = () => {
    emit('closeFeedBack');
  };
  const confirm = () => {
    // 返回给接口之后再关闭
    toastIsShow = true;
    closeFeedBack();
    emit('feedbackConfirm', {
      feedbackOptions: [...isCheckedSet],
      feedbackValue: textValue,
    });
  };
  const checkRadio = ({
    detail: { isChecked, radioText },
  }: CustomEvent<{ radioText: string; isChecked: boolean }>) => {
    if (isChecked) {
      isCheckedSet.add(radioText);
    } else {
      isCheckedSet.delete(radioText);
    }
  };
  const feedbackOptions: string[] = [
    nowLanguage.playStuck,
    nowLanguage.progressError,
    nowLanguage.videoBlack,
    nowLanguage.soundPictueAsync,
  ];
</script>

<Toast isShow={toastIsShow} on:closeIsShow={closeIsShow} content={nowLanguage.feedbackTips} />
{#if isShow}
  <div class="d-feedback-container" transition:fade>
    <div class="dialog" on:click|stopPropagation>
      <div class="header">
        <span>{nowLanguage.playerFeedBack}</span>
        <i class="icon-close" on:click={closeFeedBack}>X</i>
      </div>
      <div class="content">
        {#each feedbackOptions as radioText}
          <DRadio {radioText} width="45%" on:checkRadio={checkRadio} />
        {/each}
        <span class="other">{nowLanguage.other}：</span>
        <textarea
          name="otherContent"
          id="otherContent"
          cols="36"
          rows="3"
          placeholder={nowLanguage.feedbackPlaceHolder}
          bind:value={textValue}
        />
      </div>
      <div class="footer">
        <span
          title={nowLanguage.confirm}
          aria-label={nowLanguage.confirm}
          class="d-player-filter-reset"
          on:click={confirm}>{nowLanguage.confirm}</span
        >
      </div>
    </div>
  </div>
{/if}

<style lang="less">
  .d-feedback-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    .dialog {
      width: 400px;
      height: 240px;
      background-color: rgba(33, 33, 33, 0.9);
      color: #ffffff;
      .header {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        position: relative;
        &::after {
          content: ' ';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: hsla(0, 0%, 100%, 0.4);
        }
        .icon-close {
          position: absolute;
          right: 0px;
          top: 8px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          font: inherit;
        }
      }
      .content {
        position: relative;
        text-align: left;
      }
      .other {
        font-size: 14px;
        margin-left: 12px;
      }
      #otherContent {
        background-color: #191919;
        border: 1px solid hsla(0, 0%, 100%, 0.4);
        resize: none;
        color: #ccc;
        margin-top: 10px;
        &::-webkit-scrollbar {
          width: 5px;
          background-color: rgba(255, 255, 255, 0.5);
        }
        &::-webkit-scrollbar-thumb {
          width: 5px;
          height: 5px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
        }
      }
      .footer {
        text-align: center;
        .d-player-filter-reset {
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
      }
    }
  }
</style>
