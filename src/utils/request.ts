/**
 * @Description:request.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2022-06-03 12:30
*/
import axios from "axios";

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    function (config){
        const token = localStorage.getItem('token');
        if (token){
            config.headers.authorzation = token
        }
        if (config.method === 'post' || config.method === 'put'){
            config.headers.contentType = 'application/json'
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    function (response:any){
        if (!response.data.state){
            localStorage.clear()
            location.replace('/')
        }else {
            return response
        }
    }
)

export const Method:any = {
    GET: 'get',
    POST: 'post',
    Put: 'put',
    DELETE: 'delete'
}
export default service
