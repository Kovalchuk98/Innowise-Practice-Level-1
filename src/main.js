import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { fireAuth } from "./firebase";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  draggable: false,
  position: "top-center"
};

Vue.use(Toast, options);

Vue.config.productionTip = false;

let app;
fireAuth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
  if (user) {
    const { uid, email, displayName, photoURL } = user;
    store.commit("user/setUser", {
      uid,
      email,
      displayName,
      photoURL
    });
  }
});
