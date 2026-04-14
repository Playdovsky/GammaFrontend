<template>
  <h1 class="green">What is this project?</h1>
  <div class="details">
    <h2>Sandbox</h2>
    <p>
      The "Gamma" (γ) project is a sandbox for testing CI/CD pipelines with different tools. It is
      not meant to be a real application, but rather a playground for experimenting with different
      technologies and configurations.
    </p>
    <h2>Features</h2>
    <div>
      This sandbox project includes the following features:
      <ul>
        <li>Vue.js at Frontend</li>
        <li>FastAPI at Backend</li>
        <li>SQLite for simple database</li>
        <li>Docker for containerization</li>
        <li>GitHub Actions for CI/CD</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: var(--color-heading);
  margin-top: 12px;
}

.details {
  padding: 20px;
}
</style>
