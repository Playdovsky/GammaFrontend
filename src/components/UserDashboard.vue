<script setup lang="ts">
import { ref, onMounted } from 'vue';
import messagesService from '@/services/messagesService'

const messages = ref<UIMessage[]>([])

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
}

interface UIMessage extends Message {
  expanded: boolean;
}

onMounted(() => {
  getMessages()
});

async function getMessages(){
  try{
    const response = await messagesService.messages;
    
    messages.value = response.data.map((message: Message) => ({
      ...message,
      expanded: false
    }));

    console.log('[INFO]', response.data);
  }
  catch (error){
    console.error('[ERROR]', error);
  }
}
</script>

<template>
  <div class="dashboard-container">
    <h1>Contact messages</h1>
    <div class="message-box" v-for="message in messages" :key="message.id">
      <div @click="message.expanded = !message.expanded" class="message-header">
        <strong>{{ message.name }}</strong> ({{ message.email }})
      </div>
        
      <div v-if="message.expanded" class="message-content">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-box {
  border: 1px solid var(--vt-c-divider-light-1);
  margin-bottom: 10px;
  border-radius: 6px;
  overflow: hidden;
  width: 60%;
  margin: 10px auto;
}

.message-header {
  background-color: #222d3d;
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

.message-content {
  padding: 16px;
  background-color: var(--vt-c-indigo);
  border-top: 1px solid var(--vt-c-divider-light-1);
  text-align: left;
}

.dashboard-container {
  text-align: center;
  padding: 20px;
}
</style>
