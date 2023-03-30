<template>
    <div class="logo">
        <img src="@/assets/1.gif" />
        <span v-show="show" class="title">IWMS</span>
    </div>
</template>
<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import { collapseStore } from '@/store/collapse';

//获取store
const store = collapseStore()

//collapsed
const collapse = computed(() => {
    return store.getCollapse
})

//定义show
const show = ref(true)

watch(() => collapse.value, (collapsed: boolean) => {
    if (!collapsed) {
        setTimeout(() => {
            show.value = !collapsed
        }, 250)
    } else {
        show.value = !collapsed
    }
})
</script>
<style scoped lang='scss'>
.logo {
    // background-color: #2b2f3a;
    background-color: #2f54eb;
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    color: #fff;

    // border-right: 1px solid #e5e5e5;
    img {
        width: 43px;
        height: 43px;
        margin-right: 12px;
    }

    .title {
        height: 50px;
        background-color: #2f54eb;
        text-align: center;
        color: #fff;
        box-sizing: border-box;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        vertical-align: middle;
    }
}
</style>