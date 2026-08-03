<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const success = ref(false);
const failed = ref(false);

const loginForm = ref({
  username: '',
  password: '',
})

async function submit() {
  success.value = false;
  failed.value = false;

  try {
    await authStore.login(loginForm.value);
    success.value = true;
    failed.value = false;
    router.push('/dashboard');
  } catch (error) {
    console.error('[ERROR]', error);
    success.value = false;
    failed.value = true;
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="username">Username</label>
    <input id="username" v-model="loginForm.username" type="text" required />
    <label for="password">Password</label>
    <input id="password" v-model="loginForm.password" type="password" required />
    <button type="submit">Log in</button>
  </form>
  <div v-if="failed" class="alert alert-dark border-danger text-danger-emphasis d-flex align-items-center mb-0" role="alert">
    <span class="me-2">▲ Authentication failed. Please check your username or password and try again :/</span>
  </div>
</template>

<style scoped>
form {
  border-radius: 5px;
  padding: 20px;
}

label {
  font-size: 18px;
  display: block;
  width: 30%;
  margin: 8px auto 2px;
  color: var(--color-heading);
}

input[type='text'],
input[type='password']
{
  padding: 8px;
  display: block;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

input[type='text'],
input[type='password'],
button {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}

button {
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  padding: 14px;
  margin-top: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
}

button:hover {
  background-color: #45a049;
}

.alert {
  align-items: center;
  width: 46%;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
