<script setup lang="ts">
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
  <div class="dashboard-container">
    <h1>This dashboard should be visible only for logged in users!</h1>
    <p v-if="authStore.user" class="welcome-text">
      Welcome, <strong>{{ authStore.user.username }}</strong>!
    </p>
    <button class="logout-btn" @click="handleLogout">Log out</button>
  </div>
</template>

<style scoped>
.dashboard-container {
  text-align: center;
  padding: 20px;
}

.welcome-text {
  font-size: 18px;
  margin: 15px 0;
  color: var(--color-text);
}

.logout-btn {
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 14px auto;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
}

.logout-btn:hover {
  background-color: #45a049;
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
