import { createRouter, createWebHistory } from 'vue-router'
import AppHomeLayout from '../layouts/AppHomeLayout.vue'
import LoginLayout from '../layouts/LoginLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import HealthView from '../views/HealthView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'


const router = createRouter({
  history: createWebHistory('/api'),
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

const protectedRoutes = ['dashboard']

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.name && protectedRoutes.includes(to.name.toString()) && !authStore.isAuthenticated) {
    next({
      path: '/auth/login',
    })
  } else {
    next()
  }
})

export default router
