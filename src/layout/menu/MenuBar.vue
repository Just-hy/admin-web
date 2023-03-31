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
                <router-link to="/dashboard">首页</router-link>
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
                    <router-link to="/user">用户管理</router-link>
                </a-menu-item>
                <a-menu-item key="/role">
                    <template #icon>
                        <PieChartOutlined />
                    </template>
                    <router-link to="/role">角色管理</router-link>
                </a-menu-item>
                <a-menu-item key="/menu">
                    <template #icon>
                        <unordered-list-outlined />
                    </template>
                    <router-link to="/menu">菜单管理</router-link>
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
import { reactive, toRefs, computed, ref, watch, onMounted } from "vue";
import { Collapse, MenuMode, MenuTheme } from "ant-design-vue";
import { collapseStore } from "@/store/collapse";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
import { routes } from '@/router'
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
//当前路由
const route = useRoute()
const menuData = reactive({
    mode: "inline" as MenuMode,
    theme: "light" as MenuTheme,
    //大概等于当前选中的路由path
    selectedKeys: [""],
    openKeys: [""],
    // preOpenKeys: ['sub1'],
});
//解决刷新之后，选中菜单，有上级的时候，打开上级菜单
const setMenuOpen = (result: any) => {
    for (let i = 0; i < result.length; i++) {
        if (result[i].children) {
            console.log(result[i])
            for (let y = 0; y < result[i].children.length; y++) {
                if (result[i].children[y].path === route.path) {
                    menuData.openKeys = [result[i].path]
                }
            }
        }
    }
};
//设置当前选中menu
const selectkey = () => {
    menuData.selectedKeys.push(route.path)
}
watch(() => route.path, () => {
    selectkey()
})
onMounted(() => {
    selectkey()
    setMenuOpen(routes)
})
//刷新后有下级菜单需要展开
const changeMode = (checked: boolean) => {
    menuData.mode = checked ? "vertical" : "inline";
};
const changeTheme = (checked: boolean) => {
    menuData.theme = checked ? "dark" : "light";
};
</script>
