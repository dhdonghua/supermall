import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mockjs/index'

createApp(App).use(router).use(store).mount('#app')
