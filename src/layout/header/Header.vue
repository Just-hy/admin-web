<template>
  <div class="header-bg">
    <Collapse></Collapse>
    <Bread></Bread>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Collapse from './Collapse.vue';
import Bread from './Bread.vue'
</script>
<style scoped lang='scss'>
.header-bg {
  color: #fff;
  display: flex;
  align-items: center;
}
</style>