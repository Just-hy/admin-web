import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
export default function useMenu() {
    const addRef = ref()
    //新增
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    //编辑
    const editBtn = () => {

    }
    //删除
    const deleteBtn = () => {

    }
    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn
    }
}