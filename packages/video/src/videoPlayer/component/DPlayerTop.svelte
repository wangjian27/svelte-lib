<script lang="ts">
  // import { onDestroy } from 'svelte';

  export let title: string = '';
  // Date.prototype.format = function (fmt: string) {
  //   let o = {
  //     'h+': this.getHours(),
  //     'm+': this.getMinutes(),
  //     's+': this.getSeconds()
  //   };
  //   for (var k in o) {
  //     if (new RegExp('(' + k + ')').test(fmt)) {
  //       fmt = fmt.replace(
  //         RegExp.$1,
  //         RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
  //       );
  //     }
  //   }
  //   return fmt;
  // };
  // let currTime: string = '00:00:00';
  // currTime = new Date().format('hh:mm:ss');
  // let timeout = null;
  // timeout = setInterval(() => {
  //   currTime = new Date().format('hh:mm:ss');
  // }, 1000);

  // onDestroy(() => {
  //   clearInterval(timeout);
  // });
</script>

<div class="d-player-top">
  <p class="top-title">{title || ''}</p>
  <!-- <p class="top-title">{currTime}</p> -->
</div>

<style lang="less">
  .d-player-top {
    position: absolute;
    font-size: 16px;
    left: 0px;
    top: 0;
    right: 0px;
    color: #fff;
    display: flex;
    padding: 0 20px;
    height: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
    justify-content: space-between;
    z-index: 1;
  }
</style>
