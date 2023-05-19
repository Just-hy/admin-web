import http from "@/http";
import { ReceiveListParm, ReceiveType } from "./ReceiveType"
export const addApi = (parm: ReceiveType) => {
    return http.post({
        url: '/api/receive',
        data: parm
    })
}
export const getListApi = (parm: ReceiveListParm) => {
    return http.get({
        url: '/api/receive/list',
        params: parm
    })
}
export const editApi = (parm: ReceiveType) => {
    return http.put({
        url: '/api/receive',
        data: parm
    })
}
export const deleteApi = (did: string) => {
    return http.delete({
        url: `/api/receive/${did}`,
    })
}
export const getWarehouseListApi = () => {
    return http.get({
        url: '/api/receive/warehouse'
    })
}
export const getSupplierListApi = () => {
    return http.get({
        url: '/api/receive/supplier'
    })
}
export const getCustomerListApi = () => {
    return http.get({
        url: '/api/receive/customer'
    })
}
export const getOrganListApi = () => {
    return http.get({
        url: '/api/receive/organ'
    })
}
export const testApi = (parm: string) => {
    return http.post({
        url: '/api/receive/test',
        data: parm
    })
}