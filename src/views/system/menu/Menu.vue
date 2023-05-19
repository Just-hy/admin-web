<template>
    <a-button style="margin-bottom: 20px;" type="primary" @click="addBtn">
        <template #icon>
            <plus-outlined />
        </template>
        新增
    </a-button>
    <!--表格-->
    <a-table v-if="tableList.list && tableList.list.length > 0" :defaultExpandAllRows="true" bordered
        :scroll="{ y: tableHeight }" :columns="columns" :data-source="tableList.list" :pagination="false" rowKey="menuId"
        :expandIcon="expandIcon">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">
                <a-tag color="red" v-if="record.type == '0'">目录</a-tag>
                <a-tag color="blue" v-if="record.type == '1'">菜单</a-tag>
                <a-tag color="cyan" v-if="record.type == '2'">按钮</a-tag>
            </template>
            <template v-if="column.key === 'icon'">
                <component :is="record.icon"></component>
            </template>
            <template v-if="column.key === 'action'">
                <a-button @click="editBtn(record)" style="margin-right: 15px;" type="primary">
                    <template #icon>
                        <edit-outlined />
                    </template>
                    编辑
                </a-button>
                <a-button @click="deleteBtn(record)" type="danger">
                    <template #icon>
                        <delete-outlined />
                    </template>
                    删除
                </a-button>
            </template>
        </template>
    </a-table>
    <!--弹框组件-->
    <AddMenu ref="addRef" @refresh="refresh"></AddMenu>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import AddMenu from "./AddMenu.vue";
import useMenu from "@/composable/menu/useMenu";
import useTable from "@/composable/menu/useTable";
const { tableHeight, columns, tableList, expandIcon, refresh } = useTable()
const { addRef, addBtn, editBtn, deleteBtn } = useMenu(refresh)
</script>

<style scoped lang="scss">
:deep(.iconClass) {
    padding-left: 10px;
    color: #666;
    font-size: 12px;
}
</style>