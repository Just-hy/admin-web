<template>
    <a-tabs v-model:activeKey="activeKey" hideAdd type="editable-card" @tabClick="tabClick" @edit="onEdit">
        <a-tab-pane v-for="pane in panes" :key="pane.path" :tab="pane.title">

        </a-tab-pane>
    </a-tabs>
</template>

<script setup lang="ts">
import { tabsStore } from "@/store/tabs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Tabs } from "@/store/tabs";
//获取store
const store = tabsStore()

//当前路由
const route = useRoute()
const router = useRouter()
//选项卡的数据,从store里面获取
const panes = computed(() => {
    return store.getTabs
})
//当前激活选项卡的key
const activeKey = ref('');
//设置当前激活的选项卡
const setActiveTab = () => {
    activeKey.value = route.path;
}

const remove = (targetKey: string) => {
    //首页不能关闭
    if (targetKey === '/dashboard') return;
    let lastIndex = 0;
    store.tabsList.forEach((pane, i) => {
        if (pane.path === targetKey) {
            lastIndex = i - 1;
        }
    });
    store.tabsList = store.tabsList.filter(pane => pane.path !== targetKey);
    if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
            activeKey.value = store.tabsList[lastIndex].path;
        } else {
            activeKey.value = store.tabsList[0].path;
        }
    }
    //跳转新路由
    router.push({ path: activeKey.value })
};
//删除选项卡的方法
const onEdit = (targetKey: string) => {
    remove(targetKey)
}

//监听当前路由，把当前菜单的数据添加到选项卡数据
const addTab = () => {
    //获取title和path
    const { path, meta } = route;
    const tab: Tabs = {
        path: path,
        title: meta.title as string
    }
    //添加到选项卡数据
    store.addTab(tab)
}
//监听路由
watch(() => route.path, () => {
    //设置激活的选项卡,就是当前路由的path
    setActiveTab()
    //添加选项卡数据
    addTab()
})
//解决浏览器刷新选项卡数据丢失的问题
const beforeRefresh = () => {
    //判断不是退出登录
    if (route.path != '/login') {
        //beforeunload,浏览器刷新或卸载时调用
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('tabsview', JSON.stringify(store.tabsList))
        })
        let tabSession = sessionStorage.getItem('tabsview')
        if (tabSession) {
            let oldTabs = JSON.parse(tabSession)
            if (oldTabs.length > 0) {
                store.tabsList = oldTabs
            }
        }
    }
}
onMounted(() => {
    //解决刷新选项卡丢失
    beforeRefresh()
    //设置激活的选项卡,就是当前路由的path
    setActiveTab()
    //添加选项卡数据
    addTab()
})
//选项卡的点击事件
const tabClick = (key: string) => {
    console.log(key)
    router.push({ path: key })
}
</script>

<style scoped lang="scss"></style>