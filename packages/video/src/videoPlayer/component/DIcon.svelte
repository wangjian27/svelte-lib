<script lang="ts">
  export let icon: string;
  export let size: number | string;
  export let className: string = '';
  $: iconSize = (() => {
    let sizeNow = /^\d+$/.test(size + '') ? size + 'px' : size;
    return `font-size:${sizeNow}`;
  })();
</script>

<i class={`${icon} d-icon iconfont ${className}`} style={iconSize} />

<style lang="less" scoped>
  @import '../asset/style/iconfont.css';
  .d-icon {
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
  }
  .icon-play {
    margin-left: 5px;
  }
</style>
