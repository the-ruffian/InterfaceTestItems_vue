/**
 * @Description:全局路由
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2022-06-03 13:54
*/

import {createRouter, createWebHistory} from "vue-router";


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('../pages/User/Login.vue')
        },
        {
            path: '/',
            component: () => import('../pages/common/DefaultPage.vue'),
            beforeEnter: ((to, from, next) => {
                localStorage.getItem('token')?next: next({
                    path: '/login'
                })
                next()
            })
        }
    ]
})
