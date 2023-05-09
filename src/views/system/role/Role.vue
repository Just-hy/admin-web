<template>
    <!-- 搜索栏 -->
    <a-form layout="inline" style="margin-bottom: 15px;">
        <a-form-item>
            <a-input placeholder="请输入角色名称"></a-input>
        </a-form-item>
        <a-button style="margin-right: 15px;">
            <template #icon>
                <search-outlined />
            </template>
            搜索
        </a-button>
        <a-button type="danger" style="margin-right: 15px;">
            <template #icon>
                <close-outlined />
            </template>
            重置
        </a-button>
        <a-button @click="addBtn" type="primary" style="margin-right: 15px;">
            <template #icon>
                <plus-outlined />
            </template>
            新增
        </a-button>
    </a-form>
    <!-- 表格操作 -->
    <a-table :dataSource="tableList.list" :scroll="{ y: talbleHeight }" :pagination="rolePage" :columns="columns" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button style="margin-right: 15px;" type="primary">
                    <template #icon>
                        <edit-outlined />
                    </template>
                    编辑
                </a-button>
                <a-button style="margin-right: 15px;" type="primary">
                    <template #icon>
                        <form-outlined />
                    </template>
                    分配权限
                </a-button>
                <a-button type="danger">
                    <template #icon>
                        <delete-outlined />
                    </template>
                    删除
                </a-button>
            </template>
        </template>
    </a-table>
    <!-- 新增弹框 -->
    <add-role ref="addRef" @save="save"></add-role>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import AddRole from './AddRole.vue';
import useRole from '@/composable/role/useRole';
import useTable from '@/composable/role/useTable';
//表格操作
const { talbleHeight, tableList, columns, listParm, rolePage, getList } = useTable()
//角色操作
const { addBtn, editBtn, deleteBtn, save, addRef } = useRole(getList)
</script>
<style scoped lang='scss'></style>