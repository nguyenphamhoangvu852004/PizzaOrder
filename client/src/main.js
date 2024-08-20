import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as Vue from 'vue' // in Vue 3
import axiosInstance from './axios' // Import axios instance từ file axios.js
import VueAxios from 'vue-axios'

const app = Vue.createApp(App)

// Sử dụng axios instance đã được cấu hình
app.use(VueAxios, axiosInstance)
app.use(Buefy, {
    defaultNotificationPosition: 'is-bottom-right'
})
app.use(router)
app.mount('#app')
