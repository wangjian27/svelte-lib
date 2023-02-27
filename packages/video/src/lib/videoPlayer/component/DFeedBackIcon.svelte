<script lang="ts">
  import DFeedback from './DFeedback.svelte';
  import { fade } from 'svelte/transition';
  import { LanguageItem } from '../internationalization/index';
  import { createEventDispatcher } from 'svelte';
  const emit = createEventDispatcher();
  export let nowLanguage: LanguageItem;
  let isShowFeedBack: boolean = false;
  const openFeedBack = (): void => {
    isShowFeedBack = true;
  };
  const closeFeedBack = (): void => {
    isShowFeedBack = false;
  };
  const feedbackConfirm = ({
    detail
  }: CustomEvent<{ feedbackOptions: string[]; feedbackValue: string }>): void => {
    emit('feedbackConfirm', detail);
  };
</script>

<div class="d-icon-feedback" on:click|stopPropagation={openFeedBack} transition:fade>
  <svg
    t="1669096469269"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="5486"
    width="25"
    height="25"
    ><path
      d="M514.048 54.272q95.232 0 178.688 36.352t145.92 98.304 98.304 145.408 35.84 178.688-35.84 178.176-98.304 145.408-145.92 98.304-178.688 35.84-178.176-35.84-145.408-98.304-98.304-145.408-35.84-178.176 35.84-178.688 98.304-145.408 145.408-98.304 178.176-36.352zM515.072 826.368q26.624 0 44.544-17.92t17.92-43.52q0-26.624-17.92-44.544t-44.544-17.92-44.544 17.92-17.92 44.544q0 25.6 17.92 43.52t44.544 17.92zM567.296 574.464q-1.024-16.384 20.48-34.816t48.128-40.96 49.152-50.688 24.576-65.024q2.048-39.936-8.192-74.752t-33.792-59.904-60.928-39.936-87.552-14.848q-62.464 0-103.936 22.016t-67.072 53.248-35.84 64.512-9.216 55.808q1.024 26.624 16.896 38.912t34.304 12.8 33.792-10.24 15.36-31.232q0-12.288 7.68-30.208t20.992-34.304 32.256-27.648 42.496-11.264q46.08 0 73.728 23.04t25.6 57.856q0 17.408-10.24 32.256t-26.112 28.672-33.792 27.648-33.792 28.672-26.624 32.256-11.776 37.888l1.024 38.912q0 15.36 14.336 29.184t37.888 14.848q23.552-1.024 37.376-15.36t12.8-32.768l0-24.576z"
      p-id="5487"
      fill="rgba(255,255,255,0.5)"
    /></svg
  >
</div>
<DFeedback
  {nowLanguage}
  isShow={isShowFeedBack}
  on:closeFeedBack={closeFeedBack}
  on:feedbackConfirm={feedbackConfirm}
/>

<style lang="less">
  .d-icon-feedback {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 20px;
    right: 35px;
    z-index: 2;
    cursor: pointer;
  }
  .d-player-state-top {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 40px px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 5%;
    overflow: hidden;
    z-index: 1;
  }
</style>
