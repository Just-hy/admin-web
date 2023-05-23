import { defineStore } from "pinia";
import { getMenuListApi } from '@/api/login/login'
import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'
import Center from '@/layout/center/center.vue'
const modules = import.meta.glob('../../views/**/*.vue')
export const menuStore = defineStore('menuStore', {
    //定义state
    state: () => {
        return {
            //路由数据
            menuList: [],
            //权限字段
            authList: []
        }
    },
    //定义getters
    getters: {
        getMenu: (state) => {
            return state.menuList
        },
        getAuth: (state) => {
            return state.authList
        }
    },
    //定义actions
    actions: {
        async getMenuList(router: any) {
            let res = await getMenuListApi()
            let accessedRoutes = [] as any
            if (res && res.code == 200) {
                //生成路由数据
                accessedRoutes = filterAsyncRouter(res.data.menuList, router)
                //存储权限字段
                this.authList = res.data.authList
            }
            if (accessedRoutes.length > 0) {
                const desk = [
                    {
                        path: '/dashboard',
                        component: 'Layout',
                        name: 'dashboard',
                        meta: {
                            title: '首页',
                            icon: 'HomeOutlined',
                            roles: ["sys:manage"]
                        },
                        children: []
                    }
                ] as any
                this.menuList = this.menuList.concat(desk).concat(accessedRoutes)
            }
        }
    }
})
//生成动态路由
export function filterAsyncRouter(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = [];
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        //如果component='Layout'说明是一级菜单
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../views${component}`]
            }
        }
        if (tmp.children && tmp.children.length > 0) {
            //如果有下级，并且component != 'Layout'，说明是
            if (route.component != 'Layout') {
                tmp.component = Center
            }
            //递归
            tmp.children = filterAsyncRouter(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res;
}