import { createRouter, createWebHistory } from "vue-router"


const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: "/",
    name: "Home",
    component: () => import("@/views/home.vue"),

  }, {
    path: "/editor",
    name: "editor",
    component: () => import("@/views/editor.vue"),

  },
  {
    path: "/websocket",
    name: "WebSocket",
    component: () => import("@/views/websocket.vue"),

  }

  ]
})

export default router;