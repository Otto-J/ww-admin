import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css'
// import '@arco-design/web-vue/es/message/style/css.js'
import '@dangojs/a-query-header/dist/css/index.css'
import '@dangojs/a-query-table/dist/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
