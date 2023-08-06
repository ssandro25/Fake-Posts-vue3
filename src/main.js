import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import router from "@/router/router";
import VIntersection from "@/directives/VIntersection";

const app = createApp(App);

app.directive('intersection', VIntersection);

app.use(router).mount('#app');
