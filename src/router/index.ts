import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game
  },
  {
    path: "/j",
    name: "Join Party",
    component: () => import("@/views/JoinParty.vue")
  },
  {
    path: "/noInternet",
    name: "No internet",
    component: () => import("@/views/NoInternet.vue")
  },
  {
    path: "/infos",
    name: "Info",
    component: () => import("@/views/Infos.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router; /* '../views/About.vue')
  }
*/

/*,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */
