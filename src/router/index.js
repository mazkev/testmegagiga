import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/FormLogin.vue"),
  },
  {
    path: "/dashBoard",
    name: "dashBoard",
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/FormRegister.vue"),
  },
  {
    path: "/update-list-barang/:id",
    name: "UpdateListBarang",
    component: () => import("../components/UpdateListBarang.vue"),
  },
  {
    path: "/update-list-supplier/:id",
    name: "UpdateListSupplier",
    component: () => import("../components/UpdateListSupplier.vue"),
  },
  {
    path: "/create-supplier",
    name: "CreateListSupplier",
    component: () => import("../components/CreateListSupplier.vue"),
  },
  {
    path: "/create-barang",
    name: "CreateListBarang",
    component: () => import("../components/CreateListBarang.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
