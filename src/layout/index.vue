<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" class="asside"> <menu-bar></menu-bar></a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <Header></Header>
            </a-layout-header>
            <a-layout-content class="main">
                <Tabs></Tabs>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import MenuBar from "@/layout/menu/MenuBar.vue";
import Header from "./header/Header.vue";
import { collapseStore } from "@/store/collapse";
import Tabs from "./tabs/Tabs.vue";

//获取store
const store = collapseStore()

//collapsed
const collapsed = computed(() => {
    return store.getCollapse
})
</script>
<style scoped lang="scss">
.layout {
    height: 100%;

    .asside {
        background-color: rgb(76, 165, 238);
        background-color: #fff;
        //border-right: 1px solid #b3ade0 !important;

        // :deep(.ant-menu-inline) {
        //     border-right: none !important;
        // }
    }

    .header {
        height: 50px;
        padding: 0px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #acb8e7;
    }

    .main {
        padding: 5px 20px !important;
        // background-color: #fff !important;
        //background-color: rgb(145, 190, 216);
    }
}
</style>
