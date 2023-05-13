<template>
    <!-- <div class="bg">
        <a-button :class="{ 'createButton': true, 'button': true }" @click="addBtn">
            <template #icon>
                <plus-outlined />
            </template>
            新增
        </a-button>
        <a-button class="button" :class="{ 'modifyButton': hasSelected }" type="primary" :disabled="!hasSelected"
            @click="start">
            修改
        </a-button>
        <a-button class="button" :class="{ 'deleteButton': hasSelected }" type="primary" :disabled="!hasSelected"
            :loading="state.loading" @click="start">
            删除
        </a-button>
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `选中 ${state.selectedRowKeys.length} 条记录` }}
            </template>
        </span>
        <a-form layout="inline">
            <a-form-item label="收货单DID">
                <a-input v-model:value="listParm.did" class="input" placeholder="请输入收货单DID"></a-input>
            </a-form-item>
            <a-form-item label="组织">
                <a-select v-model:value="listParm.dbOrganDid" show-search class="input" placeholder="请选择组织"
                    :options="organList" :filterOption="filter"></a-select>
            </a-form-item>
        </a-form>
        <br>
        <a-button class="queryButton" @click="searchBtn">
            搜索
        </a-button>
        <a-button class="resetButton" @click="resetBtn">
            重置
        </a-button>
    </div> -->

    <!-- <div class="bg">
        <a-table bordered :scroll="{ y: tableHeight }" :pagination="receivePage" :dataSource="tableList.list"
            :columns="columns" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }">

        </a-table>
    </div> -->
    <StandardPanel @addBtn="addBtn" @editBtn="editBtn" @deleteBtn="deleteBtn" @searchBtn="searchBtn" @resetBtn="resetBtn"
        :state="state" :tableList="tableList">
        <template #buttons></template>
        <template #content>
            <a-form-item label="收货单DID">
                <a-input v-model:value="listParm.did" class="input" placeholder="请输入收货单DID"></a-input>
            </a-form-item>
            <a-form-item label="组织" class="input">
                <a-select v-model:value="listParm.dbOrganDid" show-search class="input" placeholder="请选择组织"
                    :options="organList" :filterOption="filter"></a-select>
            </a-form-item>
        </template>
    </StandardPanel>
    <StandardTable :tableHeight="tableHeight" :receivePage="receivePage" :tableList="tableList" :columns="columns"
        :state="state" @onSelectChange="onSelectChange">
    </StandardTable>
    <!--新增弹框-->
    <add-receive ref="addRef" @save="save"></add-receive>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import useReceive from "@/composable/receive/useReceive";
import StandardTable from "@/components/StandardTable.vue";
import StandardPanel from "@/components/StandardPanel.vue";
import AddReceive from './AddReceive.vue'
import useTable from '@/composable/receive/useTable'
type Key = string | number;
const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
});
const { tableHeight, tableList, columns, listParm, receivePage, getList, resetBtn, searchBtn } = useTable(state)
const { addBtn, editBtn, deleteBtn, save, addRef, organList, filter } = useReceive(getList, tableList, state)
// const hasSelected = computed(() => state.selectedRowKeys.length > 0);

// const start = () => {
//     state.loading = true;
//     // ajax request after empty completing
//     const selectedData = state.selectedRowKeys.map(key =>
//         tableList.list.find((item: { key: string }) => item.key === key)
//     );
//     console.log(selectedData);
//     setTimeout(() => {
//         state.loading = false;
//         state.selectedRowKeys = [];
//     }, 1000);
// };
const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
};
</script>

<style scoped lang="scss">
.input {
    width: 281px;
}
</style>