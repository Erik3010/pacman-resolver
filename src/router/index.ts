import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("@/views/Setup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
