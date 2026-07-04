import { createRouter, createWebHistory } from 'vue-router'
import AppHomeLayout from '../layouts/AppHomeLayout.vue'
import LoginLayout from '../layouts/LoginLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
    }
  ],
})

const isLoggedIn = () => {
  // Here will be logic for logging in, for example checking a token in localStorage or cookies (don't know which one yet lol)
  return !!localStorage.getItem('authToken');
}

const protectedRoutes = ['dashboard']

router.beforeEach(async (to, from, next) => {
  if (to.name && protectedRoutes.includes(to.name.toString()) && !isLoggedIn()) {
    next({
      path: '/auth',
    })
  } else {
    next()
  }
})

export default router
