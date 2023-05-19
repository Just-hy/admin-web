import { MenuModel } from "@/api/menu/MenuType"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { deleteApi } from '@/api/menu/menu'
import { message } from 'ant-design-vue'
import { FuncList } from "@/type/BaseType"
import useInstance from "@/hooks/useInstance"
export default function useMenu(refresh: FuncList) {
    const { global } = useInstance()
    const addRef = ref()
    //新增
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: MenuModel) => {
        addRef.value.show(EditType.EDIT, row)
    }
    //删除u
    const deleteBtn = async (row: MenuModel) => {
        const confirm = await global.$myconfirm()
        if (confirm) {
            let res = await deleteApi(row.menuId)
            if (res && res.code == 200) {
                message.success(res.msg)
                refresh()
            }
        }
    }
    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn
    }
}