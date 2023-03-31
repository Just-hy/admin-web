import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import test from '@/views/test/index.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/test',//用于测试store
        name: 'test',
        component: test
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/layout/dashboard/Index.vue'),
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: '#icondashboard'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
    },
    {
        path: "/system",
        component: Layout,
        name: "system",
        meta: {
            title: "系统管理",
            icon: "el-icon-menu",
            roles: ["sys:manage"],
            parentId: 0,
        },
        children: [
            {
                path: "/user",
                component: () => import('@/views/system/user/User.vue'),
                name: "user",
                meta: {
                    title: "用户管理",
                    icon: "el-icon-s-custom",
                    roles: ["sys:user"]
                },
            },
            {
                path: "/role",
                component: () => import('@/views/system/role/Role.vue'),
                name: "role",
                meta: {
                    title: "角色管理",
                    icon: "el-icon-s-tools",
                    roles: ["sys:role"]
                },
            },
            {
                path: "/menu",
                component: () => import('@/views/system/menu/Menu.vue'),
                name: "menu",
                meta: {
                    title: "菜单管理",
                    icon: "el-icon-document",
                    roles: ["sys:menu"]
                },
            },
        ],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router