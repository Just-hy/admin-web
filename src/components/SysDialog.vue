<template>
    <a-modal :visible="props.visible" :destroyOnClose="true" :width="props.width" :title="props.title" @cancel="onClose"
        wrapClassName="custom-modal">
        <template #footer>
            <a-button type="danger" @click="onClose">取消</a-button>
            <a-button type="primary" @click="onConfirm">确定</a-button>
        </template>
        <div>
            <slot name="buttons" class="buttonsCss"></slot>
            <slot name="querys"></slot>
            <div :style="{ height: props.height + 'px' }" style="overflow-y: auto;overflow-x: initial;">
                <slot name="content"></slot>
            </div>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
//子组件接受父组件的值 defineProps
const props = withDefaults(defineProps<{
    title?: string
    visible?: boolean
    width: number
    height: number
}>(), {
    title: '标题',
    visible: false,
    width: 650,
    height: 250
})

//注册事件
const emit = defineEmits(['onClose', 'onConfirm'])

//关闭弹框的事件
const onClose = () => {
    emit('onClose')
}
//弹框确定事件
const onConfirm = () => {
    emit('onConfirm')
}
</script>

<style scoped lang="scss">
:deep(button) {
    border: 0;
    display: inline-block;
    height: 36px;
    border-radius: 4px;
    margin: 5px;
    background-color: #00cbe7;
}

.custom-modal {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: 400px;
    height: 300px;
    margin: 1000px;
}
</style>