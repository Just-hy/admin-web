<template>
    <div class="bg">
        <a-table bordered :scroll="{ y: tableHeight }" :pagination="receivePage" :dataSource="tableList.list"
            :columns="columns" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChangeEvent }">
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type Key = string | number;
interface ReceivePage {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger: boolean;
    pageSizeOptions: string[];
    showTotal: (total: number) => string;
    onChange: (current: number, size: number) => void;
}
interface TableList {
    list: any[];
}
const ChildComponent = {
    inheritAttrs: false
};
const emit = defineEmits(['onSelectChange'])
let selectedRowKeysInternal: Key[] = [];
//这里要通知父组件，因为props只读
const onSelectChangeEvent = (selectedRowKeys: Key[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // props.state.selectedRowKeys = selectedRowKeys;
    emit("onSelectChange", selectedRowKeys)
};
const receivePage = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50'],
    showTotal: (total: number) => `共有${total}条数据`,
    //页数改变时触发
    onChange: (current: number, size: number) => {
        props.listParm.currentPage = current;
        props.listParm.pageSize = size;
        receivePage.current = current;
        receivePage.pageSize = size;
        //getList()重新请求列表数据
    }
})
const props = withDefaults(defineProps<{
    tableHeight: number
    listParm: any
    tableList: TableList
    columns: any
    state: any
}>(), {
    tableHeight: undefined,
})


</script>

<style scoped lang="scss">
.bg {
    background-color: white;
}
</style>