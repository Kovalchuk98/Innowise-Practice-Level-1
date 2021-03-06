/* eslint-disable no-unused-vars */
import { fireAuth, fireDb } from "../../firebase";

const collectionName = "tasks";

export default {
  namespaced: true,
  state: {
    taskArray: {},
    curday: {},
    doneDays: [],
    activeDays: []
  },
  mutations: {
    setTasks(state, payload) {
      state.taskArray = payload;
    },
    setDayTasks(state, payload) {
      state.curday = payload;
    },
    setActiveDays(state, payload) {
      state.activeDays = payload;
    },
    setDoneDays(state, payload) {
      state.doneDays = payload;
    }
  },
  actions: {
    async fetchFromDb({ commit, dispatch }) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .on("value", snap => {
            const days = [];
            days.push(snap.val());
            commit("setTasks", days[0]);
            dispatch("checkStatus");
          });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    async addTask(context, { title, descr, taskdate, completed }) {
      try {
        const taskKey = fireDb
          .ref()
          .child("tasks")
          .push().key;
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
    async editTask(context, { title, descr, taskdate, id }) {
      await fireDb
        .ref(collectionName)
        .child(`user_${fireAuth.currentUser.uid}`)
        .child(taskdate)
        .child(id)
        .update({
          title,
          descr,
          date: taskdate
        });
    },
    async toogle(context, { date, id, status }) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(date)
          .child(id)
          .update({
            completed: status
          });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    async deleteTask({ dispatch }, { date, id }) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(date)
          .child(id)
          .remove();
        dispatch("getDayTasks", date);
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    getDayTasks({ commit, state }, payload) {
      const obj = state.taskArray;
      const curday = {};
      for (let key in obj) {
        if (key === payload) {
          Object.assign(curday, obj[key]);
        }
      }
      commit("setDayTasks", curday);
    },
    initToday({ dispatch }) {
      const now = new Date();
      const locale = "ru-RU";
      const date = now.toLocaleString(locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      });
      const ar = date.split(".");
      const str = `${ar[2]}-${ar[1]}-${ar[0]}`;
      dispatch("getDayTasks", str);
    },
    checkStatus({ commit, state }) {
      const activeArray = [];
      const doneArray = [];
      Object.entries(state.taskArray).forEach(dates => {
        Object.entries(dates[1]).forEach(task => {
          if (task[1].completed === true) {
            if (!doneArray.includes(dates[0])) doneArray.push(dates[0]);
          } else if (!activeArray.includes(dates[0]))
            activeArray.push(dates[0]);
        });
      });
      commit("setActiveDays", activeArray);
      commit("setDoneDays", doneArray);
    }
  },
  getters: {
    getTasks(state) {
      return state.curday;
    },
    getAllTasks(state) {
      return state.taskArray;
    },
    getActiveDays(state) {
      return state.activeDays;
    },
    getDoneDays(state) {
      return state.doneDays;
    }
  }
};
