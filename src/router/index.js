import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../views/Games.vue"),
    children: [
      {
        path: "",
        name: "",
        component: () => import("../components/games/index.vue")
      },
      {
        path: "game",
        name: "game",
        component: () => import("../components/games/game.vue")
      },
      {
        path: "pingpong",
        name: "pingpong",
        component: () => import("../components/games/pingpong.vue")
      },
      {
        path: "lomo",
        name: "lomo",
        component: () => import("../components/games/lomo.vue")
      }
    ]
  },
  {
    path: "/teams",
    name: "Teams",
    component: () => import("../views/Team.vue"),
    children: [
      {
        path: "",
        name: "",
        component: () => import("../components/teams/index.vue")
      },
      {
        path: "project",
        name: "project",
        props: true,
        component: () => import("../components/teams/project.vue")
      }
    ]
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/join",
    name: "Join",
    component: () => import("../views/Join.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
