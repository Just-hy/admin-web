<template>
    <a-button type="primary" @click="addBtn">
        <template #icon>
            <plus-outlined />
        </template>
        新增
    </a-button>
    <!--弹框组件-->
    <AddMenu ref="addRef"></AddMenu>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import AddMenu from "./AddMenu.vue";
import useMenu from "@/composable/menu/useMenu";
const { addRef, addBtn, editBtn, deleteBtn } = useMenu()
</script>

<style scoped lang="scss"></style>