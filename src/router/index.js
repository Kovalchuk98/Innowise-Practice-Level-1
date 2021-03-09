import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import { fireAuth } from "../firebase";
import Create from "../views/Create.vue";
import AppRoutes from "./approutes";

Vue.use(VueRouter);

const routes = [
  {
    path: AppRoutes.Home,
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: AppRoutes.TaskDetails(),
    name: "task",
    component: () => import(/* webpackChunkName: "task" */ "../views/Task.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: AppRoutes.Register,
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: AppRoutes.Signin,
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  },
  {
    path: AppRoutes.Create,
    name: "create",
    props: true,
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: AppRoutes.EditTask(),
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
    next(AppRoutes.Signin);
  } else {
    next();
  }
});

export default router;
