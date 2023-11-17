<template>
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
    <ul>
        <li v-for="chat in chats">
            {{ chat }}
        </li>
    </ul>
</template>
  
<script setup>
import { ref } from 'vue';

const chats = ref([]);

const ws = new WebSocket('ws://localhost:10001');
console.log(ws);
ws.addEventListener('open', () => {
    console.log('open');
});
ws.addEventListener('message', (event) => {
    console.log(event.data);
    chats.value.push(event.data);
});
// ws.on('error', console.error);

// ws.on('open', function open() {
//     const array = new Float32Array(5);
//     for (var i = 0; i < array.length; ++i) {
//         array[i] = i / 2;
//     }
//     ws.send(array);
// });

// ws.on('message', function incoming(data) {
//     chats.value.push(data);
// });

</script>