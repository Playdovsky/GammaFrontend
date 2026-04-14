<script setup lang="ts">
function checkHealth(event: Event) {
  alert('Health check is not implemented yet!')
  console.log('Health check button clicked', event)
}
</script>

<template>
  <h1 class="green">Check your backend!</h1>
  <button @click="checkHealth">Healthcheck</button>
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
