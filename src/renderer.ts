import './index.css';
import { createApp } from 'vue';
import App from './App.vue';
import { Buffer } from "buffer"; 

window.Buffer = Buffer;
createApp(App).mount('#app');