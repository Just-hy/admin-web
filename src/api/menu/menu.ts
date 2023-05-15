import http from "@/http";
import { MenuModel } from "./MenuType";
export const getMenuListApi = () => {
    return http.get({
        url: '/api/menu/list'
    })
}
export const addMenuApi = (parm: MenuModel) => {
    return http.post({
        url: '/api/menu',
        data: parm
    })
}
export const getParentListApi = () => {
    return http.get({
        url: '/api/menu/parent'
    })
}