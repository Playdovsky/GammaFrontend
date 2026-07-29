<script setup lang="ts">
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <header>
    <div class="nav-container">
      <p v-if="authStore.user" class="logged-user-text">
        <strong>Hi {{ authStore.user.username }}! 👋</strong>
      </p>
      <button class="logout-btn" @click="handleLogout">Log out</button>
    </div>
  </header>
  <main>
      <router-link to ="/">
        <img alt="Vue logo" class="logo" src="@/assets/vue_gamma_logo.png" width="125" height="125" />
      </router-link>
      <div class="wrapper">
        <DashboardView />
      </div>
  </main>
</template>

<style scoped>

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  padding: 0 2rem; 
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.logged-user-text {
  font-size: 22px;
  margin: 15px 0;
  color: var(--color-text);
}

.logout-btn {
  font-size: 16px;
  background-color: #aa4a44;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px 0;
}

.logout-btn:hover {
  background-color: #892f29;
}

label {
  font-size: 18px;
  display: block;
  width: 30%;
  margin: 8px auto 2px;
  color: var(--color-heading);
}

.alert {
  padding-left: 20px;
}
</style>