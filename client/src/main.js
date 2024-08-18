import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'





const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(Buefy, {
    defaultNotificationPosition: 'is-bottom-right'
})
app.use(router)
app.mount('#app')
