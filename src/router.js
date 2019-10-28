import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Dashboard from './views/Dashboard.vue'
import NewCustomer from './views/NewCustomer.vue'
import OldCustomer from './views/OldCustomer.vue'
import Finish from './views/Finish.vue'
Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'start',
            component: Start
        },
        {
            path: '/start',
            name: 'start',
            component: Start
        },
        {
            path: '/Dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/NewCustomer',
            name: 'NewCustomer',
            component: NewCustomer,
        },
        {
            path: '/OldCustomer',
            name: 'OldCustomer',
            component: OldCustomer,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/Finish',
            name: 'Finish',
            component: Finish,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        }
    ]
});
/*
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        var user = localStorage.getItem('user');
        if (user == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    }else {
        next() 
    }
});*/

export default router