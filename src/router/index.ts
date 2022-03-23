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
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/Create.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "pacman-resolver" : "/"
  ),
});

export default router;
