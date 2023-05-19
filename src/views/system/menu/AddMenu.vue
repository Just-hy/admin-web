<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="confirm">
        <template #content>
            <a-form>
                <a-form-item v-bind="validateInfos.type" :labelCol="{ style: 'width:80px;' }" label="菜单类型">
                    <a-radio-group v-model:value="addModel.type">
                        <a-radio :value="'0'">目录</a-radio>
                        <a-radio :value="'1'">菜单</a-radio>
                        <a-radio :value="'2'">按钮</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-row>
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.parentName" :labelCol="{ style: 'width:80px;' }" label="上级菜单">
                            <a-input readonly @click.native="selectParent" v-model:value="addModel.parentName"
                                placeholder="请选择上级菜单"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.title" :labelCol="{ style: 'width:80px;' }" label="菜单名称">
                            <a-input v-model:value="addModel.title" placeholder="请填写菜单名称"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.code" :labelCol="{ style: 'width:80px;' }" label="权限字段">
                            <a-input v-model:value="addModel.code" placeholder="请填写权限字段"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="序号">
                            <a-input v-model:value="addModel.orderNum" placeholder="请填写菜单名称"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row v-show="addModel.type != '2'">
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.name" :labelCol="{ style: 'width:80px;' }" label="路由名称">
                            <a-input v-model:value="addModel.name" placeholder="请填写路由的name"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item v-bind="validateInfos.path" :labelCol="{ style: 'width:80px;' }" label="路由地址">
                            <a-input v-model:value="addModel.path" placeholder="请填写路由的path"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col v-show="addModel.type == '1'" :span="12">
                        <a-form-item v-bind="validateInfos.url" :labelCol="{ style: 'width:80px;' }" label="组件地址">
                            <a-input v-model:value="addModel.url" placeholder="请填写组件url"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :labelCol="{ style: 'width:80px;' }" label="菜单图标">
                            <a-input v-model:value="addModel.icon" placeholder="请填写菜单图标"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </template>
    </SysDialog>
    <!--上级菜单弹框-->
    <parent ref="parentRef" @selectId="selectId"></parent>
</template>

<script setup lang="ts">
import parent from './parent.vue'
import { ref, reactive, watch } from "vue";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { EditType, Title } from "@/type/BaseEnum";
import useForm from 'ant-design-vue/es/form/useForm';
import { MenuModel, TreeNode } from '@/api/menu/MenuType';
import { addApi, editApi } from '@/api/menu/menu';
import { message } from 'ant-design-vue';
import useInstance from '@/hooks/useInstance';
const { global } = useInstance()
const { dialog, onClose, onShow } = useDialog()
const parentRef = ref()
//表单绑定数据
const addModel = reactive({
    editType: '',
    menuId: '',
    parentId: '',
    title: '',
    code: '',
    name: '',
    path: '',
    url: '',
    type: '',
    icon: '',
    parentName: '',
    orderNum: ''
})
const rules = reactive({
    parentName: [{
        required: true,
        message: '请选择上级菜单',
        trigger: 'change'
    }],
    title: [{
        required: true,
        message: '请填写菜单名称',
        trigger: 'change'
    }],
    code: [{
        required: true,
        message: '请填写权限字段',
        trigger: 'change'
    }],
    name: [{
        required: false,
        message: '请填写路由名称',
        trigger: 'change'
    }],
    path: [{
        required: false,
        message: '请填写路由path',
        trigger: 'change'
    }],
    url: [{
        required: false,
        message: '请填写路由url',
        trigger: 'change'
    }],
    type: [{
        required: true,
        message: '请选择菜单类型',
        trigger: 'change'
    }],
})
const { validate, resetFields, validateInfos, clearValidate } = useForm(addModel, rules)
watch(() => addModel.type, () => {
    clearValidate()
    if (addModel.type != '2') {
        rules.name[0].required = true
        rules.path[0].required = true
        if (addModel.type == '1') {
            rules.url[0].required = true
        } else {
            rules.url[0].required = false
        }

    } else {
        rules.name[0].required = false
        rules.path[0].required = false
        rules.url[0].required = false
    }
})
const emit = defineEmits(['refresh'])
const confirm = () => {
    validate().then(async () => {
        let res = null;
        if (addModel.editType == EditType.ADD) {
            res = await addApi(addModel)
        } else {
            res = await editApi(addModel)
        }
        if (res && res.code == 200) {
            message.success(res.msg)
            //刷新表格
            emit('refresh')
        }
        onClose()
    })
}
const show = (type: string, row: MenuModel) => {
    resetFields()
    dialog.height = 300
    if (type == EditType.ADD) {
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        global.$objCoppy(row, addModel)
    }
    console.log(addModel)
    addModel.editType = type
    onShow()
}
defineExpose({
    show
})
//选择上级菜单 事件
const selectParent = () => {
    parentRef.value.show()
}
const selectId = (node: TreeNode) => {
    addModel.parentId = node.parentId
    addModel.parentName = node.parentName
}
</script>

<style scoped lang="scss"></style>