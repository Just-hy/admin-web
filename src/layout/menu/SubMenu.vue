<template>
    <a-sub-menu :key="menuInfo.path">
        <template #icon>
            <component :is="menuInfo.meta.icon"></component>
        </template>
        <template #title>{{ menuInfo.meta.title }}</template>
        <template v-for="item in menuInfo.children" :key="item.path">
            <template v-if="!item.children">
                <a-menu-item :key="item.path">
                    <template #icon>
                        <component :is="item.meta.icon"></component>
                    </template>
                    <router-link :to="item.path">{{ item.meta.title }}</router-link>
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.key" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
defineProps(['menuInfo'])
</script>

<style scoped lang="scss"></style>