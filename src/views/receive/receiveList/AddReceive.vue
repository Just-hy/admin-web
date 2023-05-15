<template>
    <sys-dialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="onConfirm">
        <template #content>
            <a-form>
                <a-row>
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.dbOrganDid" label="组织DID">
                            <a-input v-model:value="addModel.dbOrganDid"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="组织Code">
                            <a-input v-model:value="addModel.dbOrganCode"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="收货单号">
                            <a-input v-model:value="addModel.dbDoc"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="业务单号">
                            <a-input v-model:value="addModel.dbBusinessDoc"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="业务类型DID">
                            <a-input v-model:value="addModel.dbTosDid"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="业务类型Code">
                            <a-input v-model:value="addModel.dbTosCode"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="收货日期">
                            <a-date-picker style="width: 100%;" v-model:value="addModel.dbDelDate" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="单据状态">
                            <a-input v-model:value="addModel.dbStatus"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="清点状态">
                            <a-input v-model:value="addModel.dbCheckStatus"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="收货状态">
                            <a-input v-model:value="addModel.dbReceiveStatus"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="过账状态">
                            <a-input v-model:value="addModel.dbPostStatus"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="仓库did">
                            <a-input v-model:value="addModel.dbWarehouseDid"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="仓库编码">
                            <a-input v-model:value="addModel.dbWarehouseCode"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="供应商did">
                            <a-input v-model:value="addModel.dbSupplierDid"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="供应商编码">
                            <a-input v-model:value="addModel.dbSupplierCode"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户did">
                            <a-input v-model:value="addModel.dbCustomerDid"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="客户code">
                            <a-input v-model:value="addModel.dbCustomerCode"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="备注">
                            <a-input v-model:value="addModel.dbRemark"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </template>
    </sys-dialog>
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
import locale from "ant-design-vue/lib/date-picker/locale/en_US";
const { global } = useInstance()
const { dialog, onClose, onShow } = useDialog()
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
        message: '请填写组织did',
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
    } else {
        dialog.title = Title.EDIT
        console.log(row)
        global.$objCoppy(row, addModel)
        console.log(addModel)
        addModel.cdate = dayjs(addModel.cdate)
        addModel.mdate = dayjs(addModel.mdate)
        addModel.dbDelDate = dayjs(addModel.dbDelDate)
    }
    onShow()
}
defineExpose({
    show
})

</script>

<style scoped lang="scss"></style>