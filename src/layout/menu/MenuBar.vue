<template>
    <div>
        <menu-logo></menu-logo>
        <a-menu v-model:openKeys="menuData.openKeys" v-model:selectedKeys="menuData.selectedKeys" :mode="menuData.mode"
            :theme="menuData.theme" @openChange="onOpenChange">
            <template v-for="item in menuList" :key="item.path">
                <template v-if="item.children && item.children.length == 0">
                    <a-menu-item :key="item.path">
                        <template #icon>
                            <component :is="item.meta.icon"></component>
                        </template>
                        <router-link :to="item.path">{{ item.meta.title }}</router-link>
                    </a-menu-item>
                </template>
                <template v-else>
                    <sub-menu :key="item.key" :menu-info="item" />
                </template>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, computed, ref, watch, onMounted } from "vue";
import { Collapse, ConfigProvider, MenuMode, MenuTheme } from "ant-design-vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
import SubMenu from "./SubMenu.vue";
import { menuStore } from "@/store/menu/index";
const store = menuStore()
const menuList = computed(() => {
    return store.menuList as any
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
    //清空原数据
    menuData.openKeys = ['']
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
    setMenuOpen(menuList.value)
})
onMounted(() => {
    selectkey()
    setMenuOpen(menuList.value)
})

</script>
<style scoped lang='scss'></style>