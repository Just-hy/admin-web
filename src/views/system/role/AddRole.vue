<template>
    <sys-dialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onConfirm="confirm" @onClose="onClose">
        <template #content>
            <a-form>
                <a-form-item :labelCol="{ style: 'width:80px;' }" label="角色名称" v-bind="validateInfos.roleName">
                    <a-input v-model:value="addModel.roleName" placeholder="请输入角色名称"></a-input>
                </a-form-item>
                <a-form-item :labelCol="{ style: 'width:80px;' }" label="角色备注">
                    <a-input v-model:value="addModel.roleDesc" placeholder="请输入角色备注"></a-input>
                </a-form-item>
            </a-form>
        </template>
    </sys-dialog>
</template>
<script setup lang='ts'>
import { Form } from 'ant-design-vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { EditType, Title } from '@/type/BaseEnum';
import { reactive } from 'vue';
import useForm from 'ant-design-vue/es/form/useForm';
//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog()

//表单数据
const addModel = reactive({
    roleName: '',
    roleDesc: '',
    type: EditType.ADD
})
//表单验证规则
const rules = reactive({
    roleName: [{
        required: true,
        message: '请填写角色名称',
        trigger: 'change'
    }]
})
//表单验证属性
const { validate, validateInfos, resetFields } = useForm(addModel, rules)

//注册事件
const emit = defineEmits(['save'])


//弹框确定
const confirm = () => {
    validate().then(() => {
        emit('save', addModel)
        onClose()
    })

}
//父组件调用
const show = (type: string) => {
    resetFields();
    //弹框高度
    dialog.height = 150;
    //设置弹框标题
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    //弹框显示
    onShow()
}

//暴露给父组件使用
defineExpose({
    show
})
</script>
<style scoped lang='scss'></style>