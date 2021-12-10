import { createRouter, createWebHistory } from 'vue-router';
// import { defineAsyncComponent } from 'vue';

import CoachesDetail from './pages/coaches/CoachesDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import NotFound from './pages/NotFound.vue';
import UserLogin from './pages/login/UserLogin.vue';
import store from './store/index.js';

const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id', component: CoachesDetail, props: true, children: [
                { path: 'contact', component: ContactCoach }, //coaches/c1/contact    
            ]
        },
        { path: '/register', component: CoachesRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/login', component: UserLogin, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;