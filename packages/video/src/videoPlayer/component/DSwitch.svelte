<script lang="ts">
  import { tick } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  const emits = createEventDispatcher();
  export let modelValue: number | string | boolean;
  export let width: string = '40px';
  export let trueValue: number | string | boolean = true;
  export let falseValue: number | string | boolean = true;
  export let activeColor: string = '#409EFF';
  let input: HTMLInputElement;
  $: checked = (() => modelValue === trueValue)();
  const handleInput = async () => {
    await tick();
    const val: boolean = input.checked;
    emits('update', val);
    emits('change', val);
  };
</script>

<div class={checked ? 'is-checked d-switch' : 'd-switch'} style={`width:${width}`}>
  <input
    class="d-switch__input"
    bind:this={input}
    type="checkbox"
    {checked}
    on:change={handleInput}
    true-value={trueValue}
    false-value={falseValue}
  />
  <span class="d-switch_action" />
</div>

<style lang="less" scoped>
  .d-switch {
    position: relative;
    height: 18px;
    transition: background 0.2s;
    background: rgb(117, 117, 117);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    .d-switch__input {
      position: relative;
      z-index: 1;
      margin: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .d-switch_action {
      position: absolute;
      transition: 0.2s;
      left: 2px;
      top: 2px;
      z-index: 0;
      height: 5px;
      width: 5px;
      background: #fff;
      border-radius: 50%;
    }
    &.is-checked {
      background-color: var(--primary-color);
      .d-switch_action {
        left: 100%;
        background: #fff;
        margin-left: -18px;
      }
    }
  }
</style>
