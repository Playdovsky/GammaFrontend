<script setup lang="ts">
import { ref, onMounted } from 'vue';
import messagesService from '@/services/messagesService'

const messages = ref<UIMessage[]>([])

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  published: string;
  archived: boolean;
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

async function deleteMessage(id: number){
  const confirmed = confirm('Are you sure you want to delete this message? This is a hard delete and this action cannot be undone.');
  if (!confirmed) return;
  
  try{
    await messagesService.deleteMessage(id);
    messages.value = messages.value.filter(message => message.id !== id);
    console.log('[INFO] Message deleted successfully');
  }
  catch(error){
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
        <div class="message-footer">
          <p class="publish-info">published at: {{ message.published }}</p>
          <button class="delete-btn" @click="deleteMessage(message.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-box {
  border: 1px solid var(--color-border);
  margin-bottom: 10px;
  border-radius: 6px;
  overflow: hidden;
  width: 50%;
  margin: 10px auto;
}

.message-box:hover{
  border: 1px solid var(--color-border-hover);
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
  padding-bottom: 32px;
  background-color: var(--vt-c-indigo);
  border-top: 1px solid var(--color-border);
  text-align: left;
}

.dashboard-container {
  text-align: center;
  padding: 20px;
}

.publish-info{
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  float: left;
}

.message-footer{
  align-items: center;
  margin-top: auto;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  margin-top: 5%;
  padding-top: 8px;
  padding-bottom: 8px;
}

.delete-btn {
  font-size: 12px;
  background-color: #aa4a44;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.delete-btn:hover {
  background-color: #892f29;
}
</style>
