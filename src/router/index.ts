import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import test from '@/views/test/index.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/test',
        name: 'test',
        component: test
    },
    {
        path: '/',
        name: 'Home',
        component: Layout
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router