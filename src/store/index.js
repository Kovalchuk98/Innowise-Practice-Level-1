import Vue from "vue";
import Vuex from "vuex";
import { fireAuth, fireDb, GoogleProvider } from "../firebase";

Vue.use(Vuex);

const collectionName = "tasks";

export default new Vuex.Store({
  state: {
    user: null,
    taskArray: {},
    curday: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setTasks(state, payload) {
      state.taskArray = payload;
    },
    setDayTasks(state, payload) {
      state.curday = payload;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async signup({ email, password, displayName }) {
      try {
        await fireAuth.createUserWithEmailAndPassword(email, password);
        const usera = fireAuth.currentUser;
        usera.updateProfile({
          displayName
        });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async login({ commit }, payload) {
      try {
        await fireAuth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    async signInWithGoogle() {
      try {
        await fireAuth.signInWithPopup(GoogleProvider);
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    async logout({ commit }) {
      await fireAuth.signOut();
      commit("setUser", null);
    },

    async fetchFromDb({ commit }) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .on("value", snap => {
            const days = [];
            days.push(snap.val());
            commit("setTasks", days[0]);
            // console.log(days[0]);
          });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async addtask({ commit, state }, { title, descr, taskdate, completed }) {
      try {
        const taskKey = fireDb
          .ref()
          .child("tasks")
          .push().key;

        // eslint-disable-next-line no-unused-vars
        const addRef = await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(taskdate)
          .child(taskKey.slice(1, taskKey.length))
          .set({
            title,
            descr,
            completed,
            id: taskKey.slice(1, taskKey.length),
            date: taskdate
          });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async toogle({ dispatch }, payload) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(payload.date)
          .child(payload.id)
          .update({
            completed: !payload.completed
          });
        dispatch("fetchFromDb");
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteTask({ commit }, payload) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(payload.date)
          .child(payload.id)
          .remove();
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    getDayTasks({ commit, state }, payload) {
      let obj = state.taskArray;
      let curday = {};
      for (let key in obj) {
        if (key == payload) {
          Object.assign(curday, obj[key]);
        }
      }

      // console.log(curday);

      commit("setDayTasks", curday);
    }
  },
  getters: {
    getTasks(state) {
      return state.curday;
    },
    getUser(state) {
      return state.user;
    }
  },
  modules: {}
});
