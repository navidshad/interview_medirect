import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/main.css'
import components from './components/components.js'
import store from './store'

const app = createApp(App).use(store)

Object.keys(components).forEach(key => app.component(key, components[key]))

app.use(router)

app.mount('#app')