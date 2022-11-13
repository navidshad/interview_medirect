import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: SplashView
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) fo../views/Splash.vue
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue')
    }
  ]
})

export default router
