<template>
    <div>
        <menu-logo></menu-logo>
        <a-menu v-model:openKeys="menuData.openKeys" v-model:selectedKeys="menuData.selectedKeys" :mode="menuData.mode"
            :theme="menuData.theme" @openChange="onOpenChange">
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
            <a-sub-menu key="/receive">
                <template #icon>
                    <vertical-align-bottom-outlined />
                </template>
                <template #title>入库管理</template>
                <a-menu-item key="/receiveList" index="/receiveList">
                    <template #icon>
                        <unordered-list-outlined />
                    </template>
                    <router-link to="/receiveList">收货清单列表</router-link>
                </a-menu-item>
                <a-menu-item key="/entryPrint">
                    <template #icon>
                        <printer-outlined />
                    </template>
                    <router-link to="/entryPrint">入库条码打印</router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, computed, ref, watch, onMounted } from "vue";
import { Collapse, ConfigProvider, MenuMode, MenuTheme } from "ant-design-vue";
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
            // console.log(result[i])
            for (let y = 0; y < result[i].children.length; y++) {
                if (result[i].children[y].path === route.path) {
                    menuData.openKeys = [result[i].path]
                }
            }
        }
    }
};
//功能：一次只能打开一个菜单
const onOpenChange = (openKeys: string[]) => {
    // console.log(openKeys)
    if (openKeys.length !== 0) {
        menuData.openKeys = [openKeys[1]]
    } else {
        menuData.openKeys = ['']
    }
};
//设置当前选中menu
const selectkey = () => {
    menuData.selectedKeys.push(route.path)
}
watch(() => route.path, () => {
    //清空原来的数据
    menuData.selectedKeys = ['']
    selectkey()
    setMenuOpen(routes)
})
onMounted(() => {
    selectkey()
    setMenuOpen(routes)
})

</script>
<style scoped lang='scss'></style>