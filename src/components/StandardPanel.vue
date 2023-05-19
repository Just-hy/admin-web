<template>
    <div class="bg">
        <template v-if="choose">
            <a-button :class="{ 'createButton': true, 'button': true }" @click="addBtnEvent">
                <template #icon>
                    <plus-outlined />
                </template>
                新增
            </a-button>
            <a-button class="button" :class="{ 'modifyButton': hasSelected }" type="primary" :disabled="!hasSelected"
                @click="editBtnEvent">
                修改
            </a-button>
            <a-button class="button" :class="{ 'deleteButton': hasSelected }" type="primary" :disabled="!hasSelected"
                :loading="state.loading" @click="deleteBtnEvent">
                删除
            </a-button>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                    {{ `选中 ${state.selectedRowKeys.length} 条记录` }}
                </template>
            </span>
        </template>
        <slot name="buttons"></slot>
        <!--搜索栏-->
        <a-form layout="inline">
            <slot name="content"></slot>
        </a-form>
        <br>
        <a-button class="queryButton" @click="searchBtnEvent">
            搜索
        </a-button>
        <a-button class="resetButton" @click="resetBtnEvent">
            重置
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
interface TableList {
    list: any[];
}
//TODO 编辑与删除的点击事件
type Key = string | number;
const emit = defineEmits(['addBtn', 'editBtn', 'deleteBtn', 'searchBtn', 'resetBtn', 'selectedChange'])
const ChildComponent = {
    inheritAttrs: false
};
const searchBtnEvent = () => {
    emit("searchBtn")
}
const resetBtnEvent = () => {
    emit("resetBtn")
}
const addBtnEvent = () => {
    emit("addBtn")
}
const editBtnEvent = () => {
    emit("editBtn")
}
const deleteBtnEvent = () => {
    emit("deleteBtn")
}
const hasSelected = computed(() => props.state.selectedRowKeys.length > 0);
watch(hasSelected, (newValue, oldValue) => {
    emit('selectedChange', hasSelected)
})
const props = withDefaults(defineProps<{
    state: any
    tableList: TableList
    choose: boolean
}>(), {
    choose: false
})
</script>

<style scoped lang="scss">
.button {
    border: 0;
    width: 92px;
    height: 36px;
    border-radius: 4px;
    margin: 5px;
}

.createButton {
    background-color: #00cbe7;
    color: white;
}

.modifyButton {
    background-color: #ffa033;
    color: white;
}

.deleteButton {
    background-color: #ff342d;
    color: white;
}

.queryButton {
    width: 68px;
    height: 36px;
    background-color: #1139a0;
    border-radius: 4px;
    margin: 5px;
    color: white;
}

.input {
    width: 281px;
}

.resetButton {
    width: 70px;
    height: 36px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.15);
    margin: 5px;
}

.bg {
    background-color: white;
}
</style>