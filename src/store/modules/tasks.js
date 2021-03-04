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
    async editTask(context, payload) {
      // console.log(payload);
      await fireDb
        .ref(collectionName)
        .child(`user_${fireAuth.currentUser.uid}`)
        .child(payload.taskdate)
        .child(payload.id)
        .update({
          title: payload.title,
          descr: payload.descr,
          date: payload.taskdate
        });
    },
    async toogle(context, payload) {
      try {
        await fireDb
          .ref(collectionName)
          .child(`user_${fireAuth.currentUser.uid}`)
          .child(payload.date)
          .child(payload.id)
          .update({
            completed: !payload.completed
          });
      } catch (e) {
        this._vm.$toast.warning(e.message);
      }
    },
    async deleteTask(context, payload) {
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
      commit("setDayTasks", curday);
    },
    initToday({ dispatch }) {
      let now = new Date();
      const locale = "ru-RU";
      const date = now.toLocaleString(locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      });
      let ar = date.split(".");
      let str = `${ar[2]}-${ar[1]}-${ar[0]}`;
      dispatch("getDayTasks", str);
    },
    checkStatus({ commit, state }) {
      let activeArray = [];
      let doneArray = [];
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
