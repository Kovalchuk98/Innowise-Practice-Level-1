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
    async login(context, payload) {
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
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
};
