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
//编辑
export const editUserApi = (parm: UserType) => {
    return http.put({
        url: '/api/user',
        data: parm
    })
}
//删除
export const deleteUserApi = (userId: string) => {
    return http.delete({
        url: `/api/user/${userId}`
    })
}
//列表
export const getListApi = (parm: ListParm) => {
    return http.get({
        url: '/api/user/list',
        params: parm
    })
}
export const getUserByIdApi = (userId: string) => {
    return http.get({
        url: '/api/user/getUser',
        params: { userId: userId }
    })
}