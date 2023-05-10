<template>
    <div class="logo">
        <img :style="{ 'margin-left': collapse ? '0px' : '10px' }" src="@/assets/logo@3x.png" />
        <span v-show="show" class="title">IMES</span>
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
    //width: 208px;
    height: 65px;
    background-color: #0C2D82;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    color: #fff;

    // border-right: 1px solid #e5e5e5;
    img {
        width: 49px;
        height: 21px;
        margin-right: 10px;
        margin-left: 24px;
    }

    .title {
        width: 62px;
        background-color: #0C2D82;
        color: #ffffff;
        font-weight: 600;
        font-size: 24px;
        vertical-align: middle;
    }
}
</style>