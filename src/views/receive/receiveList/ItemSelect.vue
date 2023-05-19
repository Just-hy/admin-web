<template>
    <sys-dialog :title="dialog.title" :width="800" :height="dialog.height" :visible="dialog.visible" @onClose="onClose"
        @onConfirm="onConfirm">
        <template #querys>
            <a-form-item style="width:300px;" label="物料编码">
                <a-input v-model:value="listParm.itemCode" class="input" placeholder="请输入物料编码"></a-input>
            </a-form-item>
            <a-button class="queryButton" @click="searchBtnEvent">
                搜索
            </a-button>
            <a-button class="resetButton" @click="resetBtnEvent">
                重置
            </a-button>
        </template>
        <template #content>
            <StandardTable :tableHeight="tableHeight" :listParm="listParm" :tableList="tableList" :columns="columns"
                :state="state" @onSelectChange="onSelectChange">
            </StandardTable>
        </template>
    </sys-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import useDialog from "@/hooks/useDialog";
import StandardTable from "@/components/StandardTable.vue";
import SysDialog from "@/components/SysDialog.vue";
type Key = string | number;
const { dialog, onClose, onShow } = useDialog()
const emit = defineEmits(['backSelect'])
const onConfirm = () => {
    const selectedData = state.selectedRowKeys.map((key) =>
        tableList.list.find((item: { key: string }) => item.key === key)
    );
    emit('backSelect', selectedData)
    onClose()
}
const show = () => {
    onShow()
}
const searchBtnEvent = () => {
    //置空
    state.selectedRowKeys = [];
    //getList()获取列表数据
}
const resetBtnEvent = () => {
    //置空
    state.selectedRowKeys = [];
    listParm.currentPage = 1
    //getList()获取列表数据
}
let selectedData: any
const onSelectChange = (selectedRowKeys: Key[]) => {
    state.selectedRowKeys = selectedRowKeys;
}
const tableList = reactive<{
    list: []
}>({
    list: []
});
const columns = [
    {
        title: "物料编码",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "物料名称",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "送货数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "打印数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "清点数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "收货数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "过账数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "退货数量",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "备注",
        dataIndex: "index",
        key: "index",
    },
]
const tableHeight = ref(0)
interface QueryParm {
    pageSize: number,
    currentPage: number,
    itemCode: string
}
const listParm = reactive<QueryParm>({
    pageSize: 1,
    currentPage: 1,
    itemCode: ''
})
const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
});
onMounted(() => {
    //getList()接口方法，获取数据
    nextTick(() => {
        tableHeight.value = window.innerHeight - 300
    })
});
defineExpose({
    show
})
</script>

<style scoped lang="scss"></style>