import http from "@/http"
import { ListParm, UserType } from '@/api/user/UserType'
//获取角色列表
export const getRoleListApi = () => {
    return http.get({
        url: "/api/user/role"
    })
}
//新增
export const addUserApi = (parm: UserType) => {
    return http.post({
        url: '/api/user',
        data: parm
    })
}
//列表
export const getListApi = (parm: ListParm) => {
    return http.get({
        url: '/api/user/list',
        params: parm
    })
}