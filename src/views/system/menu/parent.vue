<template>
    <sys-dialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="confirm">
        <template #content>
            <a-tree :fieldNames="fieldNames" :show-line="showLine" :tree-data="treeData" @select="onSelect"></a-tree>
        </template>
    </sys-dialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useParent from '@/composable/menu/useParent'
import { reactive, ref } from 'vue';
import useDialog from '@/hooks/useDialog';
import { message } from 'ant-design-vue';
import { TreeNode } from '@/api/menu/MenuType'
import type { TreeProps } from 'ant-design-vue';
const { dialog, onClose, onShow } = useDialog()
const { showLine, treeData, fieldNames, onSelect, selectNode } = useParent()
//显示弹框
const show = () => {
    dialog.title = '选择上级菜单'
    dialog.height = 450;
    dialog.width = 300
    onShow()
}
defineExpose({
    show
})


//注册事件
const emit = defineEmits(['selectId'])

//确定
const confirm = () => {
    if (!selectNode.parentName) {
        message.error('请选择上级菜单')
        return;
    }
    emit('selectId', selectNode)
    onClose()
}
</script>
<style scoped lang='scss'></style>