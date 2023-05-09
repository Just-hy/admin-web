<template>
    <div>用户管理</div>
    <a-button type="primary" @click="addBtn">新增</a-button>
    <!-- 弹框组件 -->
    <sys-dialog :visible="dialog.visible" :title="dialog.title" @on-close="onClose" @on-confirm="onConfirm">
        <template #content>
            新增用户
        </template>
    </sys-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import SysDialog from "@/components/SysDialog.vue";
//弹框属性
const dialog = reactive({
    visible: false,
    title: '新增用户'
})
//新增按钮点击事件
const addBtn = () => {
    dialog.visible = true
}
//弹框关闭
const onClose = () => {
    dialog.visible = false
}
//弹框确定
const onConfirm = () => {
    dialog.visible = false
}
</script>

<style scoped lang="scss"></style>