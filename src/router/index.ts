import { createRouter, createWebHistory } from 'vue-router'
import AppHomeLayout from '../layouts/AppHomeLayout.vue'
import LoginLayout from '../layouts/LoginLayout.vue'
import HealthView from '../views/HealthView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHomeLayout,
      children: [ {
          path: 'health',
          component: HealthView,
        },
        {
          path: 'about',
          component: AboutView,
        }, 
        {
          path: 'contact',
          component: ContactView,
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: LoginLayout,
      children: [
        {
          path: 'login',
          component: LoginView,
        }
      ]
    },
  ],
})

export default router
