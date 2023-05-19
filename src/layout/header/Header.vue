<template>
  <div class="header-bg">
    <div class="leftHeader">
      <Collapse></Collapse>
      <Bread></Bread>
    </div>
    <div>
      <right-menu></right-menu>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import RightMenu from './RightMenu.vue';
import Collapse from './Collapse.vue';
import Bread from './Bread.vue'
</script>
<style scoped lang='scss'>
.header-bg {
  color: #fff;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;

  .leftHeader {
    display: flex;
  }
}
</style>