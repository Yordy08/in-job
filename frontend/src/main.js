import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

// Hacer que Axios y el router estén disponibles
app.config.globalProperties.$axios = axios;
app.use(router);

// Montar la aplicación
app.mount('#app');

