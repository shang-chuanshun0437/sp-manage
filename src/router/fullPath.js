import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import Home from '@/components/Home'

import BusinessList from '../views/business/BusinessList'
import AddBusiness from '../views/business/AddBusiness'
import EditBussiness from '../views/business/EditBussiness'
import VerifyCode from '../views/verifyMsg/VerifyCode'
import Role from '../views/role/Role'
import UserRoleList from '../views/userRole/UserRoleList'
import InterfaceAccess from '../views/interface/InterfaceAccess'

import Report from '../views/ureport/Report'
import Account from '../views/account/Account'
// 懒加载方式，当路由被访问的时候才加载对应组件
//const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'businessList',
            redirect: '/user/businessList'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/user/businessList',
            children: [
              { path: '/user/businessList', component: BusinessList, name: 'businessList' },
              { path: '/user/editBussiness', component: EditBussiness, name: 'editBussiness' },
              { path: '/user/addBusiness', component: AddBusiness, name: 'addBusiness' },
              { path: '/interface/access/list', component: InterfaceAccess, name: 'interfaceAccess' },
              { path: '/verifyCode', component: VerifyCode, name: 'verifyCode' },
              { path: '/role/list', component: Role, name: 'role' },
              { path: '/role/userRoleList', component: UserRoleList, name: 'userRoleList' },
              { path: '/report', component: Report, name: 'report' },
            ]
        },
        {
          path: '/account/private',
          name: 'account',
          component: Account,
        },
    ]

})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login') || to.path.startsWith('/register')) {
        window.localStorage.removeItem('access-user')
        next()
    } else {
        let user = JSON.parse(window.localStorage.getItem('access-user'))
        if (!user) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

export default router
