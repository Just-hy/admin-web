import http from "@/http";
import { RoleListParm, RoleType, TreeParm } from "./RoleType";
//新增
export const addApi = (parm: RoleType) => {
    return http.post({
        url: '/api/role',
        data: parm
    })
}
//列表
export const getListAPi = (parm: RoleListParm) => {
    return http.get({
        url: '/api/role/list',
        params: parm
    })
}
//编辑
export const editApi = (parm: RoleType) => {
    return http.put({
        url: '/api/role',
        data: parm
    })
}
//删除
export const deleteApi = (roleId: string) => {
    return http.delete({
        url: `/api/role/${roleId}`
    })
}
//树数据回显
export const getAssignShowApi = (parm: TreeParm) => {
    return http.get({
        url: '/api/role/getAssignShow',
        params: parm
    })
}