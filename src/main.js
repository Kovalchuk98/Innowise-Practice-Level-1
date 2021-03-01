import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
  if (user) {
    const { uid, email, displayName, photoURL } = user;
    store.commit("setUser", {
      uid,
      email,
      displayName,
      photoURL
    });
  }
});
