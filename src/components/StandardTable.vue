<template>
    <div class="bg">
        <a-table bordered :scroll="{ y: tableHeight }" :pagination="receivePage" :dataSource="tableList.list"
            :columns="columns" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChangeEvent }">
        </a-table>
    </div>
</template>

<script setup lang="ts">
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
const props = withDefaults(defineProps<{
    tableHeight: number
    receivePage: ReceivePage
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