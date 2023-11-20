import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LibraryView from "../views/LibraryView.vue";
import SearchView from "../views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/library",
      component: LibraryView,
    },
    {
      path: "/search",
      component: SearchView,
    },
  ],
});

export default router;
