import './assets/main.css';

import Wind from '@/presets/wind';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Wind
});

app.mount('#app')
