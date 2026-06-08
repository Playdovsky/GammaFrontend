<script setup lang="ts">
import healthcheckService from '@/services/healthcheckService'

async function checkHealth(){
  try{
    const response = await healthcheckService.healthStatus;
    console.log('[INFO]', response.data.message);
    alert('Backend is healthy! Status: ' + response.data.message);
  }
  catch (error) {
    console.error('[ERROR]', error);
    alert('Backend is not healthy! Please check the console for more details.');
  }
}
</script>

<template>
  <h1 class="green">Check your back!</h1>
  <button @click="checkHealth">Click me!</button>
</template>

<style scoped>
button {
  font-size: 16px;
  background-color: #aa4a44;
  color: white;
  padding: 14px;
  margin-top: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  width: 50%;
  height: 75px;
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
  background-color: #892f29;
}
</style>
