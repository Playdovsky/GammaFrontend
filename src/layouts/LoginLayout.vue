<script setup lang="ts">
import LoginView from '../views/LoginView.vue'
</script>

<template>
  <header>
    <router-link to ="/">
      <img alt="Vue logo" class="logo" src="@/assets/vue_gamma_logo.png" width="125" height="125" />
    </router-link>
  </header>
  <main>
      <div class="wrapper">
        <LoginView />
      </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
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
</style>
