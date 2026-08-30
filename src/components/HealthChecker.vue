<script setup lang="ts">
import healthcheckService from '@/services/healthcheckService'
import { ref } from 'vue'

const health = ref(false);
const healthFailed = ref(false);

async function checkHealth(){
  health.value = false
  healthFailed.value = false

  try{
    const response = await healthcheckService.healthStatus;
    console.log('[INFO]', response.data.message);
    health.value = true;
  }
  catch (error) {
    console.error('[ERROR]', error);
    healthFailed.value = true;
  }
}
</script>

<template>
  <h1 class="green">Check your backend!</h1>
  <button @click="checkHealth">Click me!</button>
  <div v-if="health" class="alert alert-dark border-success text-success-emphasis d-flex align-items-center mb-0" role="alert">
    <span class="me-2">●</span> Backend is healthy!
  </div>
  <div v-if="healthFailed" class="alert alert-dark border-danger text-danger-emphasis d-flex align-items-center mb-0" role="alert">
    <span class="me-2">▲</span> Backend is not healthy :/
  </div>
</template>

<style scoped>
button {
  font-size: 16px;
  background-color: #89CFF0;
  color: white;
  padding: 14px;
  margin-top: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
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

button:hover {
  background-color: #0000FF;
}

.alert {
  margin-top: 14px;
}
</style>
