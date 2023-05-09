import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue';
//默认返回值类型
export interface Result<T = any> {
    code: number;
    msg: string;
    data: T;
}
class request {
    private instance: AxiosInstance; //axios实例
    //构造函数 给instance进行初始化
    constructor(config: AxiosRequestConfig) {
        //创建axios实例
        this.instance = axios.create(config);
        //拦截器配置
        this.interceptors();
    }
    //拦截器
    private interceptors() {
        //请求发送之前的拦截器：添加token
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            //配置token
            let token = '';
            //如果token存在，放到请求的头部
            if (token) {
                config.headers = {
                    ...config.headers,
                    token: token
                }
            }
            return config;
        }, (error: any) => {
            // 错误抛到业务代码
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员！'
            return error
        })

        //请求返回之后的处理
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            console.log(res.data)
            if (res.data.code != 200) {
                message.error(res.data.msg || '服务器出错')
                return Promise.reject(res.data.msg || '服务器出错')
            } else {
                return res.data
            }
        }, (error) => {
            console.log('进入错误')
            error.data = {};
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        message.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = '未授权，请重新登录';
                        message.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = '拒绝访问';
                        message.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        message.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = '请求方法未允许';
                        message.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = '请求超时';
                        message.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = '服务器端出错';
                        message.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = '网络未实现';
                        message.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = '网络错误';
                        message.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = '服务不可用';
                        message.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = '网络超时';
                        message.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        message.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        message.error(error.data.msg)
                }
            } else {
                error.data.msg = "连接到服务器失败";
                message.error(error.data.msg)
            }
            return Promise.reject(error)
            // return error
        })
    }
    service<T>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                    return err
                })
        })
    }

    get<T = Result>(config: AxiosRequestConfig): Promise<T> {
        return this.service<T>({ ...config, method: 'GET' })
    }

    post<T = Result>(config: AxiosRequestConfig): Promise<T> {
        return this.service<T>({ ...config, method: 'POST' })
    }

    delete<T = Result>(config: AxiosRequestConfig): Promise<T> {
        return this.service<T>({ ...config, method: 'DELETE' })
    }

    put<T = Result>(config: AxiosRequestConfig): Promise<T> {
        return this.service<T>({ ...config, method: 'PUT' })
    }
}
export default request;