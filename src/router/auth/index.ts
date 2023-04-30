export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/auth/journal/layouts/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */ '@/auth/journal/views/Login.vue'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunkName: "Resgister" */ '@/auth/journal/views/Register.vue'),
        },
    ],
}