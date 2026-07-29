<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
</script>

<template>
  <div class="page-container">
    <header>
        <router-link to ="/dashboard">
          <img alt="Vue logo" class="logo" src="@/assets/vue_gamma_logo.png" width="125" height="125" />
        </router-link>
  
      <div class="wrapper">
        <HelloWorld msg="Gamma γ" />
  
        <nav>
          <RouterLink class="view-redirect" to="/health">Health</RouterLink>
          <RouterLink class="view-redirect" to="/about">About</RouterLink>
          <RouterLink class="view-redirect" to="/contact">Contact</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  padding: 2rem;
}

header {
  line-height: 1.5;
  margin-bottom: 2rem;
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

nav a.view-redirect.router-link-exact-active {
  color: var(--color-text);
}

nav a.view-redirect.router-link-exact-active:hover {
  background-color: transparent;
}

nav a.view-redirect {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a.view-redirect:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .page-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    min-height: 100vh;
  }

  header {
    display: flex;
    place-items: center;
    margin-bottom: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>