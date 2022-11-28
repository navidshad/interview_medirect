import { createApp } from "vue";

import VueApexCharts from "vue3-apexcharts";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";

import "./assets/style/main.css";

import components from "./components/components.js";
import filters from "./helpers/filter";
import store from "./store";

const app = createApp(App)

Object.keys(components).forEach((key) => app.component(key, components[key]));

app.use(store);
app.use(router);
app.use(VueApexCharts);
app.use(Toast);

app.config.globalProperties.$filter = filters;

app.mount("#app");
