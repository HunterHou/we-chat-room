<template>
    <div style="margin: 0;padding: 0;">
        <div style="margin: 0;padding: 0;width: 100%;">
            <span v-if="!editName" @click="editName = !editName" style="cursor: pointer;color: blue;">
                {{ name || '匿名' }}
            </span>
            <input v-if="editName" v-model="name" placeholder="请输入昵称" />
            <input v-if="!editName" v-model="message" placeholder="发送消息" />
            <button @click="sendMessage">{{ editName ? '确定' : '发送' }}</button>
        </div>
        <div v-for="chat in chats" :style="{ margin: '8px', textAlign: chat?.name === (name || '匿名') ? 'right' : 'left' }">
            <div style="font-weight: 550;">
                {{ chat?.time }} - {{ chat?.name }}
            </div>
            <div style="margin:4px;min-height: 40px;border-radius: 10px;padding: 8px;"
                :style="{ backgroundColor: chat?.name === (name || '匿名') ? 'green' : 'antiquewhite' }">
                {{ chat?.message }}
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const chats = ref([]);
const message = ref('');
const name = ref('张三');
const editName = ref(false);

const ws = new WebSocket('ws://localhost:10001');
ws.addEventListener('open', () => {
    console.log('open');
});
ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    chats.value.unshift(data);
});

const sendMessage = () => {
    if (editName.value) {
        editName.value = !editName.value
        return
    };
    if (!message.value) {
        alert('必须填写昵称');
        return
    }
    const params = {
        name: name.value || '匿名',
        message: message.value,
        time: new Date().toLocaleString()
    }
    ws.send(JSON.stringify(params));
    // message.value = '';
}
</script>