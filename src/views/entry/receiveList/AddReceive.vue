<template>
    <sys-dialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="onConfirm">
        <template #buttons>
            <a-button class="button" type="primary">
                <template #icon>
                    <plus-outlined />
                </template>
                刷新
            </a-button>
            <a-button class="button" type="primary">
                <template #icon>
                    <plus-outlined />
                </template>
                条码打印
            </a-button>
            <a-button class="button" type="primary" @click="showItem">
                <template #icon>
                    <plus-outlined />
                </template>
                物料信息
            </a-button>
            <a-button class="button" type="primary" @click="showSn">
                <template #icon>
                    <plus-outlined />
                </template>
                条码信息
            </a-button>
            <a-button class="button" type="primary" @click="showContainer">
                <template #icon>
                    <plus-outlined />
                </template>
                容器信息
            </a-button>
        </template>
        <template #content>
            <a-form>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" v-bind="validateInfos.dbOrganDid" label="组织">
                            <a-select v-model:value="addModel.dbOrganDid" show-search class="input" placeholder="请选择组织"
                                :options="organList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="单号">
                            <a-input v-model:value="addModel.dbDoc" class="input" placeholder="请输入单号" disabled></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="业务单号">
                            <a-input v-model:value="addModel.dbBusinessDoc" class="input" placeholder="请输入业务单号"
                                disabled></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="收货日期">
                            <a-date-picker v-model:value="addModel.dbDelDate" style="width: 100%;" disabled />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="创建日期">
                            <a-date-picker v-model:value="addModel.cdate" style="width: 100%;" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="单据状态">
                            <a-select v-model:value="addModel.dbStatus" show-search class="input" placeholder="请选择单据状态"
                                :options="StatusList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="清点状态">
                            <a-select v-model:value="addModel.dbCheckStatus" show-search class="input" placeholder="请选择清点状态"
                                :options="CheckStatusList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="收货状态">
                            <a-select v-model:value="addModel.dbReceiveStatus" show-search class="input"
                                placeholder="请选择收货状态" :options="ReceiveStatusList" :filterOption="filter"
                                disabled></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="过账状态">
                            <a-select v-model:value="addModel.dbPostStatus" show-search class="input" placeholder="请选择过账状态"
                                :options="PostStatusList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="仓库">
                            <a-select v-model:value="addModel.dbWarehouseDid" show-search class="input" placeholder="请选择仓库"
                                :options="warehouseList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="供应商">
                            <a-select v-model:value="addModel.dbSupplierDid" show-search class="input" placeholder="请选择供应商"
                                :options="supplierList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="客户">
                            <a-select v-model:value="addModel.dbCustomerDid" show-search class="input" placeholder="请选择客户"
                                :options="customerList" :filterOption="filter" disabled></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="明细信息面板">
                    <a-button class="button" type="primary">
                        <template #icon>
                            <plus-outlined />
                        </template>
                        选择物料
                    </a-button>
                    <a-button class="button" type="primary">
                        <template #icon>
                            <plus-outlined />
                        </template>
                        删除
                    </a-button>
                    <a-table :columns="columns"
                        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"></a-table>
                </a-tab-pane>
            </a-tabs>
        </template>
    </sys-dialog>
    <ItemSelect ref="itemSelectComp"></ItemSelect>
    <SnSelect ref="snSelectComp"></SnSelect>
    <ContainerSelect ref="containerSelectComp"></ContainerSelect>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { EditType, Title } from "@/type/BaseEnum";
import useForm from 'ant-design-vue/es/form/useForm';
import { ReceiveType } from "@/api/receive/ReceiveType";
import useInstance from '@/hooks/useInstance'
import dayjs from 'dayjs'
import { SelectProps } from "ant-design-vue";
import ItemSelect from "./ItemSelect.vue";
import SnSelect from "./SnSelect.vue";
import ContainerSelect from "./ContainerSelect.vue";
const activeKey = ref('1')
const { global } = useInstance()
const { dialog, onClose, onShow } = useDialog()
type Key = string | number;
const itemSelectComp = ref()
const snSelectComp = ref()
const containerSelectComp = ref()
const showItem = () => {
    itemSelectComp.value.show()
}
const showSn = () => {
    snSelectComp.value.show()
}
const showContainer = () => {
    containerSelectComp.value.show()
}
const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
});
const StatusList = ref<SelectProps['options']>([
    { value: '1', label: '录入' },
    { value: '5', label: '开始清点' },
    { value: '10', label: '开始收货' },
    { value: '15', label: '开始过账' },
    { value: '20', label: '完成' },
    { value: '25', label: '结案' }
])
const CheckStatusList = ref<SelectProps['options']>([
    { value: '1', label: '未清点' },
    { value: '5', label: '部分清点' },
    { value: '10', label: '清点完成' }
])
const ReceiveStatusList = ref<SelectProps['options']>([
    { value: '1', label: '未收货' },
    { value: '5', label: '部分收货' },
    { value: '10', label: '收货完成' }
])
const PostStatusList = ref<SelectProps['options']>([
    { value: '1', label: '未过账' },
    { value: '5', label: '部分过账' },
    { value: '10', label: '过账完成' }
])
const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
};
const columns = [
    {
        title: "物料编码",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "物料名称",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "送货数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "打印数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "清点数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "收货数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "过账数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "退货数量",
        dataIndex: "index",
        key: "index"
    },
    {
        title: "备注",
        dataIndex: "index",
        key: "index"
    },
]
interface AddModel {
    did: string;
    cuser: string;
    muser: string;
    cdate: string | Date | dayjs.Dayjs;
    mdate: string | Date | dayjs.Dayjs;
    plastupdate: string;
    dbDoc: string;
    dbOrganDid: string;
    dbOrganCode: string;
    dbDelDate: string | Date | dayjs.Dayjs;
    dbSupplierDid: string;
    dbSupplierCode: string;
    dbStatus: string;
    dbCheckStatus: string;
    dbReceiveStatus: string;
    dbPostStatus: string;
    dbTosDid: string;
    dbTosCode: string;
    dbSrcType: string;
    dbSrcDoc: string;
    dbBusinessDoc: string;
    dbCustomerDid: string;
    dbCustomerCode: string;
    dbWarehouseDid: string;
    dbWarehouseCode: string;
    dbRemark: string;
}
const addModel: AddModel = reactive({
    did: '',
    cuser: '',
    muser: '',
    cdate: '',
    mdate: '',
    plastupdate: '',
    dbDoc: '',
    dbOrganDid: '',
    dbOrganCode: '',
    dbDelDate: '',
    dbSupplierDid: '',
    dbSupplierCode: '',
    dbStatus: '',
    dbCheckStatus: '',
    dbReceiveStatus: '',
    dbPostStatus: '',
    dbTosDid: '',
    dbTosCode: '',
    dbSrcType: '',
    dbSrcDoc: '',
    dbBusinessDoc: '',
    dbCustomerDid: '',
    dbCustomerCode: '',
    dbWarehouseDid: '',
    dbWarehouseCode: '',
    dbRemark: '',
})
const rules = reactive({
    dbOrganDid: [{
        required: true,
        message: '请输入组织',
        trigger: 'change'
    }]
})
const { validate, resetFields, validateInfos } = useForm(addModel, rules)
const emit = defineEmits(['save'])
const onConfirm = () => {
    validate().then(() => {
        emit('save', addModel)
        onClose()
    })
}
const show = (type: string, row: ReceiveType) => {
    resetFields()
    if (type == EditType.ADD) {
        dialog.title = Title.ADD
    } else if (type == EditType.EDIT) {
        dialog.title = Title.EDIT
        console.log(row)
        global.$objCoppy(row, addModel)
        console.log(addModel)
        addModel.cdate = dayjs(addModel.cdate)
        addModel.mdate = dayjs(addModel.mdate)
        addModel.dbDelDate = dayjs(addModel.dbDelDate)
    } else {
        dialog.title = Title.SHOW
        console.log(row)
        global.$objCoppy(row, addModel)
        console.log(addModel)
        addModel.cdate = dayjs(addModel.cdate)
        addModel.mdate = dayjs(addModel.mdate)
        addModel.dbDelDate = dayjs(addModel.dbDelDate)
    }
    onShow()
}
const props = withDefaults(defineProps<{
    organList: any,
    warehouseList: any,
    supplierList: any,
    customerList: any
}>(), {

})
const filter = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
}
defineExpose({
    show
})

</script>

<style scoped lang="scss"></style>