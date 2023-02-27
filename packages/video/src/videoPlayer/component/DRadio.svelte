<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const emit = createEventDispatcher();
  export let radioText: string = '';
  export let width: string = '100%';
  let isChecked: boolean = false;
  const checkRadio = () => {
    isChecked = !isChecked;
    emit('checkRadio', { radioText, isChecked });
  };
</script>

<div
  title={radioText}
  class="d-radio"
  class:d-radio-checked={isChecked}
  style={`width:${width}`}
  on:click|stopPropagation={checkRadio}
>
  {radioText}
</div>

<style lang="less">
  .d-radio {
    position: relative;
    display: inline-block;
    padding-left: 20px;
    box-sizing: border-box;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    margin-left: 12px;
    margin-top: 10px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      top: 2px;
      left: 0;
      width: 5px;
      height: 5px;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
  }
  .d-radio.d-radio-checked {
    &::before {
      content: '';
      border-color: #409eff;
      position: absolute;
      display: inline-block;
      top: 2px;
      left: 0;
      width: 5px;
      height: 5px;
      border: 1px solid #409eff;
      border-radius: 50%;
    }
    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 3px;
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #00a1d6;
      border-radius: 50%;
    }
  }
</style>
