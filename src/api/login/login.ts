import http from "@/http"
import { LoginParm } from '@/api/login/LoginType'
//登录
export const loginApi = (parm: LoginParm) => {
    return http.post({
        url: '/api/login/login',
        data: parm
    })
}
export const testApi = (parm: string) => {
    return http.post({
        url: '/post/Test',
        data: parm
    })
}