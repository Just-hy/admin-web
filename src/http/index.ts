import request from "./request";
//http://10.19.253.92:8353
//http://localhost:8089
const http = new request({
    baseURL: 'http://10.19.253.92:8089',
    timeout: 10000
})
export default http