import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import components from './components/components.js'

const app = createApp(App)

Object.keys(components).keys(key => app.component(key, components[key]))

app.use(router)

app.mount('#app')