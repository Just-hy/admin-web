import { UserType } from "@/api/user/UserType"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"


import { FuncList } from "@/type/BaseType"

export default function useUser(getList: FuncList) {
    //弹框属性
    const addRef = ref()
    //新增
    const addBtn = () => {
        addRef.value.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: UserType) => {

    }
    //删除
    const deleteBtn = (row: UserType) => {

    }
    //保存
    const save = async (parm: UserType) => {
        // console.log(parm)
        // let res = null
        // if (parm.type == EditType.ADD) {
        //     res = await addUserApi(parm)
        // } else {

        // }
        // if (res && res.code == 200) {
        //     //信息提示
        //     message.success(res.msg)
        //     //刷新表格
        //     getList()
        // }
    }
    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn,
        save
    }
}