import { fireAuth, GoogleProvider } from "../../firebase";
export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async signup(context, { email, password, displayName }) {
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
    async login(context, { email, password }) {
      try {
        await fireAuth.signInWithEmailAndPassword(email, password);
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
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
};
