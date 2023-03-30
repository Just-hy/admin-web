<template>
    <div>
        <menu-logo></menu-logo>
        <div>
            <a-switch :checked="menuData.mode === 'vertical'" @change="changeMode" />
            <span v-show="show">Change Mode</span>
        </div>
        <div>
            <a-switch :checked="menuData.theme === 'dark'" @change="changeTheme" />
            <span v-show="show">Change Theme</span>
        </div>
        <a-menu v-model:openKeys="menuData.openKeys" v-model:selectedKeys="menuData.selectedKeys" :mode="menuData.mode"
            :theme="menuData.theme">
            <a-menu-item key="/dashboard">
                <template #icon>
                    <home-outlined />
                </template>
                <span to="/dashboard">首页</span>
            </a-menu-item>
            <a-sub-menu key="/system">
                <template #icon>
                    <setting-outlined />
                </template>
                <template #title>系统管理</template>
                <a-menu-item key="/user" index="/user">
                    <template #icon>
                        <user-outlined />
                    </template>
                    <span to="/user">用户管理</span>
                </a-menu-item>
                <a-menu-item key="/role">
                    <template #icon>
                        <PieChartOutlined />
                    </template>
                    <span to="/role">角色管理</span>
                </a-menu-item>
                <a-menu-item key="/menu">
                    <template #icon>
                        <unordered-list-outlined />
                    </template>
                    <span to="/menu">菜单管理</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #icon>
                    <AppstoreOutlined />
                </template>
                <template #title>Navigation Three</template>
                <a-menu-item key="5">Option 3</a-menu-item>
                <a-menu-item key="6">Option 4</a-menu-item>
                <a-sub-menu key="sub1-2" title="Submenu">
                    <a-menu-item key="7">Option 5</a-menu-item>
                    <a-menu-item key="8">Option 6</a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, computed, ref, watch } from "vue";
import { Collapse, MenuMode, MenuTheme } from "ant-design-vue";
import { collapseStore } from "@/store/collapse";
import MenuLogo from "./MenuLogo.vue";
//获取store
const store = collapseStore()

//collapsed
const collapse = computed(() => {
    return store.getCollapse
})

//定义show
const show = ref(true)

//监听collapsed值，做延时处理
//解决标题闪动的问题,collapse.value变化会传入=》collapsed
watch(() => collapse.value, (collapsed: boolean) => {
    if (!collapsed) {
        setTimeout(() => {
            show.value = !collapsed
        }, 250)
    } else {
        show.value = !collapsed
    }
})

const menuData = reactive({
    mode: "inline" as MenuMode,
    theme: "light" as MenuTheme,
    selectedKeys: ["1"],
    openKeys: ["sub1"],
});
const changeMode = (checked: boolean) => {
    menuData.mode = checked ? "vertical" : "inline";
};
const changeTheme = (checked: boolean) => {
    menuData.theme = checked ? "dark" : "light";
};
</script>
