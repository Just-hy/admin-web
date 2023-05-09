import { RoleType } from "@/api/role/RoleType";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import { addApi } from "@/api/role/role";
import { message } from "ant-design-vue";
import { FuncList } from "@/type/BaseType";
export default function useRole(getList: FuncList) {
    //弹框属性
    const addRef = ref();

    //新增按钮
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    //编辑按钮
    const editBtn = () => {

    }
    //删除按钮
    const deleteBtn = () => {

    }
    //保存
    const save = async (data: RoleType) => {
        let res = null;
        if (data.type == EditType.ADD) {
            res = await addApi(data)
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