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
    <StandardPanel :choose="false" @addBtn="addBtn" @editBtn="editBtn" @deleteBtn="deleteBtn" @searchBtn="searchBtn"
        @resetBtn="resetBtn" :state="state" :tableList="tableList" @selectedChange="handleSelectedChange">
        <template #buttons>
            <a-button @click="showBtn()" class="button" :class="{ 'selectButton': isSelected }" type="primary"
                :disabled="!isSelected">
                <template #icon>
                    <plus-outlined />
                </template>
                查看
            </a-button>
            <a-button class="button" :class="{ 'selectButton': isSelected }" type="primary" :disabled="!isSelected">
                <template #icon>
                    <plus-outlined />
                </template>
                完成
            </a-button>
            <a-button class="button" :class="{ 'selectButton': isSelected }" style="width: 120px;" type="primary"
                :disabled="!isSelected">
                <template #icon>
                    <plus-outlined />
                </template>
                取消完成
            </a-button>
            <a-button class="button" :class="{ 'selectButton': isSelected }" type="primary" :disabled="!isSelected">
                <template #icon>
                    <plus-outlined />
                </template>
                结案
            </a-button>
            <a-button class="button" :class="{ 'selectButton': isSelected }" style="width: 120px;" type="primary"
                :disabled="!isSelected">
                <template #icon>
                    <plus-outlined />
                </template>
                取消结案
            </a-button>
        </template>
        <template #content>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="组织">
                <a-select v-model:value="listParm.dbOrganDid" show-search class="input" placeholder="请选择组织"
                    :options="organList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="单号">
                <a-input v-model:value="listParm.dbDoc" class="input" placeholder="请输入单号"></a-input>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="业务单号">
                <a-input v-model:value="listParm.dbBusinessDoc" class="input" placeholder="请输入业务单号"></a-input>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="收货日期">
                <div>
                    <a-date-picker v-model:value="listParm.dbBeginDelDate" style="display: inline-block;" />
                    <a-date-picker v-model:value="listParm.dbEndDelDate" style="display: inline-block;" />
                </div>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="创建日期">
                <div>
                    <a-date-picker v-model:value="listParm.beginCdate" style="display: inline-block;" />
                    <a-date-picker v-model:value="listParm.endCdate" style="display: inline-block;" />
                </div>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="单据状态">
                <a-select v-model:value="listParm.dbStatus" show-search class="input" placeholder="请选择单据状态"
                    :options="StatusList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="清点状态">
                <a-select v-model:value="listParm.dbCheckStatus" show-search class="input" placeholder="请选择清点状态"
                    :options="CheckStatusList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="收货状态">
                <a-select v-model:value="listParm.dbReceiveStatus" show-search class="input" placeholder="请选择收货状态"
                    :options="ReceiveStatusList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="过账状态">
                <a-select v-model:value="listParm.dbPostStatus" show-search class="input" placeholder="请选择过账状态"
                    :options="PostStatusList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="仓库">
                <a-select v-model:value="listParm.dbWarehouseDid" show-search class="input" placeholder="请选择仓库"
                    :options="warehouseList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="供应商">
                <a-select v-model:value="listParm.dbSupplierDid" show-search class="input" placeholder="请选择供应商"
                    :options="supplierList" :filterOption="filter"></a-select>
            </a-form-item>
            <a-form-item :labelCol="{ style: 'width:80px;' }" label="客户">
                <a-select v-model:value="listParm.dbCustomerDid" show-search class="input" placeholder="请选择客户"
                    :options="customerList" :filterOption="filter"></a-select>
            </a-form-item>
        </template>
    </StandardPanel>
    <StandardTable :tableHeight="tableHeight" :list-parm="listParm" :tableList="tableList" :columns="columns" :state="state"
        @onSelectChange="onSelectChange">
    </StandardTable>
    <!--新增弹框-->
    <add-receive :organ-list="organList" :warehouse-list="warehouseList" :supplier-list="supplierList"
        :customer-list="customerList" ref="addRef" @save="save"></add-receive>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import useReceive from "@/composable/receive/useReceive";
import StandardTable from "@/components/StandardTable.vue";
import StandardPanel from "@/components/StandardPanel.vue";
import AddReceive from './AddReceive.vue'
import useTable from '@/composable/receive/useTable'
type Key = string | number;
const isSelected = ref(false);
const handleSelectedChange = (hasSelected: any) => {
    isSelected.value = hasSelected.value
}
const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
});
const { tableHeight, tableList, columns, listParm, receivePage, getList, resetBtn, searchBtn, StatusList, CheckStatusList, ReceiveStatusList, PostStatusList } = useTable(state)
const { addBtn, editBtn, deleteBtn, showBtn, save, addRef, organList, warehouseList, supplierList, customerList, filter } = useReceive(getList, tableList, state)
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
    width: 298px;
}

.button {
    border: solid 1px rgba(0, 0, 0, 0.15);
    width: 92px;
    height: 36px;
    border-radius: 4px;
    margin: 5px;
}

.selectButton {
    background-color: white;
    color: black;
}
</style>