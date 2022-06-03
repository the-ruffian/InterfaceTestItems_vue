/**
 * @Description: 用户模块接口
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2022-06-03 14:44
*/

import request, {Method} from "../utils/request";

export const userRegister = (data = {}) => {
    return request({
        url: '/api/user/register',
        method: Method.POST,
        data
    })
}

export const userLogin = (data = {}) =>{
    return request({
        url: '/api/user/login',
        method: Method.POST,
        data
    })
}
