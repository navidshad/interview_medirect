import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/main.css'
import components from './components/components.js'

const app = createApp(App)

Object.keys(components).forEach(key => app.component(key, components[key]))

app.use(router)

app.mount('#app')