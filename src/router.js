import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Dashboard from './views/Dashboard.vue'
import NewCustomer from './views/NewCustomer.vue'
import OldCustomer from './views/OldCustomer.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'start',
            component: Start
        },
        {
            path: '/Dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        {
            path: '/NewCustomer',
            name: 'NewCustomer',
            component: NewCustomer
        },
        {
            path: '/OldCustomer',
            name: 'OldCustomer',
            component: OldCustomer
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        }
    ]
})