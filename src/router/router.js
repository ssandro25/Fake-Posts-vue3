import {createRouter, createWebHistory} from "vue-router";
import Main from "@/components/pages/Main.vue";
import ViewPost from "@/components/pages/ViewPost.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/post/:id',
        component: ViewPost
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;