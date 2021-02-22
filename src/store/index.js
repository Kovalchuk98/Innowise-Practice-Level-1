import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskArray: [
      {
        id: 1,
        title: "delectus aut autem",
        completed: false
      },
      {
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false
      },
      {
        id: 3,
        title: "fugiat veniam minus",
        completed: false
      },
      {
        id: 4,
        title: "et porro tempora",
        completed: false
      },
      {
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getTasks(state) {
      return state.taskArray;
    }
  },
  modules: {}
});
