import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LikedView from "../views/LikedView.vue";
import SearchView from "../views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/search",
      component: SearchView,
    },
    {
      path: "/liked",
      component: LikedView,
    },
  ],
});

export default router;
