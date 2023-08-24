import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@arco-design/web-vue/es/message/style/css.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
