<template>
    <div>
        <a-breadcrumb class="bread">
            <a-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, onMounted, watch } from "vue";
import { RouteLocationMatched, useRoute } from "vue-router";
const route = useRoute()

//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([])

//面包屑导航数据
const getBread = () => {
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    //没有首页主动加
    if (first && first.path != '/dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(matched)
    }
    //设置面包屑导航数据
    tabs.value = matched
}
onMounted(() => {
    getBread()
})
//监听路由数据，更新面包屑导航
watch(() => route.path, () => {
    getBread()
})
</script>

<style scoped lang="scss">
.bread {
    margin-left: 15px;

    .item {
        color: #fff;
    }
}
</style>