import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    componement: Home,
  },
  {
    name: "About",
    path: "/about",
    componement: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
