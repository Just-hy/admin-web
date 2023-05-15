import { ReceiveType } from "@/api/receive/ReceiveType"
import { addApi, getOrganListApi } from "@/api/receive/receive"
import { EditType } from "@/type/BaseEnum"
import { onMounted, ref, reactive, computed } from "vue"
import { message, SelectProps } from "ant-design-vue";
import { FuncList } from "@/type/BaseType";
type Key = string | number;
export default function useReceive(getList: FuncList, tableList: { list: any[] }, state: { selectedRowKeys: Key[], loading: boolean }) {
    const addRef = ref()
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    const showBtn = () => {
        const selectedData = state.selectedRowKeys.map((key) =>
            tableList.list.find((item: { key: string }) => item.key === key)
        );
        addRef.value.show(EditType.EDIT, selectedData[0])
        state.selectedRowKeys = [];
    }
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const editBtn = () => {

    };
    const deleteBtn = () => {
        state.loading = true;
        // ajax request after empty completing
        const selectedData = state.selectedRowKeys.map((key) =>
            tableList.list.find((item: { key: string }) => item.key === key)
        );
        console.log(selectedData);
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };
    const save = async (data: ReceiveType) => {
        const res = await addApi(data)
        if (res && res.code == 200) {
            message.success(res.msg)
            getList()
        }
    }
    const organList = ref<SelectProps['options']>([])
    const getOrganList = async () => {
        let res = await getOrganListApi()
        if (res && res.code == 200) {
            organList.value = res.data
        }
    }
    const filter = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0
    }
    onMounted(() => {
        getOrganList()
    })
    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef,
        organList,
        filter,
        showBtn
    }
}