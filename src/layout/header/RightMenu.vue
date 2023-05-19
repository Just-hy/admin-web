<template>
    <a-dropdown placement="bottomLeft">
        <a class="ant-dropdown-link" @click.prevent>
            <img class="right-img" src="@/assets/user.gif">
        </a>
        <template #overlay>
            <a-menu>
                <a-menu-item key="1">修改密码</a-menu-item>
                <a-menu-item key="2" @click="loginout">退出登录</a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import { clearSession } from '@/utils/auth'
import { ref, reactive } from "vue";
import type { MenuProps } from 'ant-design-vue'
import { tabsStore } from '@/store/tabs/index'
import { useRouter } from "vue-router"
const store = tabsStore()
const router = useRouter()
const loginout = () => {
    router.push({ name: 'login' })
    clearSession()
    store.tabsList = []
}
</script>

<style scoped lang="scss">
.right-img {
    width: 35px;
    height: 35px;
}
</style>