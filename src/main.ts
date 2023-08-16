import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import App from "@/App.vue";
import {store} from "@/store";


const app = createApp(App);
app.use(store).mount("#app");



