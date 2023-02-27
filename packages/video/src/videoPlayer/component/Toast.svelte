<script lang="ts">
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const emit = createEventDispatcher();
  export let content: string = '';
  export let zIndex: number | string = 9999;
  export let duration: number = 2000;
  export let isShow: boolean = false;
  $: if (isShow) {
    setTimeout(() => {
      emit('closeIsShow');
    }, duration);
  }
</script>

{#if isShow}
  <div class="d-toast" style={`z-index: ${zIndex}`} transition:fade>
    <p class="d-toast-content">{@html content}</p>
  </div>
{/if}

<style lang="less">
  .d-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(40, 40, 40, 0.96);
    padding: 0 18px;
    border-radius: 10px;
    &-content {
      font-size: 16px;
      line-height: 1;
      word-break: break-all;
      color: #fefefe;
    }
  }
</style>
