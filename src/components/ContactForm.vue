<script setup lang="ts">
import { ref } from 'vue'
import contactService from '@/services/contactService'

const contactForm = ref({
  name: '',
  email: '',
  message: '',
})

async function submit() {
  try {
    const response = await contactService.sendContactForm(contactForm.value);
    console.log('[INFO]', response.data);
    alert('Thanks for your message, ' + contactForm.value.name + '!');
  } catch (error) {
    console.error('[ERROR]', error);
  }
}
</script>

<template>
  <h1 class="green">Contact me!</h1>
  <form @submit.prevent="submit">
    <label for="name">Your name</label>
    <input id="name" v-model="contactForm.name" type="text" required />
    <label for="email">email</label>
    <input id="email" v-model="contactForm.email" type="email" required />
    <label for="message">What do you want to tell us?</label>
    <textarea id="message" v-model="contactForm.message" required></textarea>
    <button type="submit">Send it!</button>
  </form>
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
input[type='email'],
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
input[type='email'],
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
</style>
