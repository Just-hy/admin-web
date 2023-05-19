<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="onConfirm">
        <template #content>
            <a-tree ref="assignTree" v-if="treeData && treeData?.length > 0" class="myTree" checkable defaultExpandAll
                :show-line="showLine" :tree-data="treeData" :fieldNames="fieldNames"
                v-model:checkedKeys="checkedKeys"></a-tree>
        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { RoleType } from "@/api/role/RoleType";
import useAssign from "@/composable/role/useAssign";
import { getUserId } from '@/utils/auth'
import { message } from "ant-design-vue";
const { assignTree, showLine, checkedKeys, fieldNames, treeData, getTreeData } = useAssign()
const { dialog, onClose, onShow } = useDialog()
const onConfirm = async () => {
    console.log(assignTree.value.checkedKeys)
    console.log(assignTree.value.halfCheckedKeys)
    const ids = assignTree.value.checkedKeys.concat(assignTree.value.halfCheckedKeys)
}
const show = (row: RoleType) => {
    dialog.title = '为[' + row.roleName + ']分配权限'
    dialog.width = 300
    dialog.height = 450
    //获取树数据
    getTreeData({ userId: getUserId() || '', roleId: row.roleId })
    onShow()
}
defineExpose({
    show
})
</script>

<style lang="scss">
.myTree {
    .ant-tree-switcher-noop {
        display: none !important;
    }
}
</style>