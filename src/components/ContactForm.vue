<script setup lang="ts">
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: '',
})

function submit() {
  alert('Thanks for your message, ' + contactForm.value.name + '!')
}
</script>

<template>
  <h1>Contact us!</h1>
  <form @submit.prevent="submit">
    <label for="name">Your name</label>
    <input id="name" v-model="contactForm.name" type="text" />
    <label for="email">email</label>
    <input id="email" v-model="contactForm.email" type="email" />
    <label for="message">What do you want to tell us?</label>
    <textarea id="message" v-model="contactForm.message"></textarea>
    <button type="submit">Send it!</button>
  </form>
</template>

<style scoped>
form {
  border-radius: 5px;
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 2px;
  margin-top: 8px;
}

input[type='text'],
input[type='email'],
textarea {
  width: 30%;
  padding: 8px;
  display: block;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 30%;
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
