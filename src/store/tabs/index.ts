import { defineStore } from "pinia";
//定义选项卡的数据类型
export interface Tabs {
    title: string;//菜单的名称
    path: string;//当前路由的path
}
//定义state
export interface State {
    tabsList: Array<Tabs>
}
//定义stroe
export const tabsStore = defineStore('tabsStore', {
    //定义state
    state: (): State => {
        return {
            tabsList: []
        }
    },
    //定义getters
    getters: {
        //获取选项卡数据
        getTabs(state) {
            return state.tabsList;
        }
    },
    //定义actions
    actions: {
        addTab(tab: Tabs) {
            //登录页排除
            if (tab.path == '/login') return;
            //判断数据是否在选项卡数据中
            if (this.tabsList.some(item => item.path === tab.path)) return;
            //添加到选项卡数据
            this.tabsList.push(tab);
        }
    }
})