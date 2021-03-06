import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import { fireAuth } from "../firebase";
import Create from "../views/Create.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/task/:id",
    name: "task",
    component: () => import(/* webpackChunkName: "task" */ "../views/Task.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  },
  {
    path: "/task/create",
    name: "create",
    props: true,
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/task/edit/:id",
    name: "edit",
    props: true,
    component: Create,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !fireAuth.currentUser) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
