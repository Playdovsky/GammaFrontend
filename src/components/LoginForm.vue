<script setup lang="ts">
import { ref } from 'vue'
import loginService from '@/services/loginService'

const success = ref(false);
const failed = ref(false);

const loginForm = ref({
  login: '',
  password: '',
})

async function submit() {
  success.value = false;
  failed.value = false;

  try {
    const response = await loginService.login(loginForm.value);
    console.log('[INFO]', response.data);
    success.value = true;
    failed.value = false;
  } catch (error) {
    console.error('[ERROR]', error);
    success.value = false;
    failed.value = true;
  }
}
</script>

<template>
  <h1 class="green">Log in</h1>
  <form @submit.prevent="submit">
    <label for="name">Login</label>
    <input id="name" v-model="loginForm.login" type="text" required />
    <label for="email">Password</label>
    <input id="email" v-model="loginForm.password" type="password" required />
    <button type="submit">Log in</button>
  </form>
  <div v-if="failed" class="alert alert-dark border-danger text-danger-emphasis d-flex align-items-center mb-0" role="alert">
    <span class="me-2">▲</span> Log in failed. Check you login or password and try again :/
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
  margin-bottom: 2px;
  margin-top: 8px;
  color: var(--color-heading);
}

input[type='text'],
input[type='password'],
textarea {
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
textarea,
button {
  width: 50%;
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

textarea {
  height: 100px;
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
  padding-left: 20px;
}
</style>
