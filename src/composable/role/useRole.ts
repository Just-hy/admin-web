import { RoleType } from "@/api/role/RoleType";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import { addApi, editApi, deleteApi } from "@/api/role/role";
import { message } from "ant-design-vue";
import { FuncList } from "@/type/BaseType";
import useInstance from "@/hooks/useInstance";
export default function useRole(getList: FuncList) {
    const { global } = useInstance()
    //弹框属性
    const addRef = ref();

    //新增按钮
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    //编辑按钮
    const editBtn = (row: RoleType) => {
        addRef.value.show(EditType.EDIT, row)
    }
    //删除按钮
    const deleteBtn = async (row: RoleType) => {
        //信息确定
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteApi(row.roleId)
            if (res && res.code == 200) {
                //信息提示
                message.success(res.msg)
                //刷新表格
                getList()
            }
        }
    }
    //保存
    const save = async (data: RoleType) => {
        let res = null;
        if (data.type == EditType.ADD) {
            res = await addApi(data)
        } else {
            res = await editApi(data)
        }
        if (res && res.code == 200) {
            //信息提示
            message.success(res.msg)
            //刷新表格
            getList()
        }
    }
    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn,
        save
    }
}