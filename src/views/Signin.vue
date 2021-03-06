<template>
  <div class="wrapper">
    <div class="login_form">
      <div class="input_wrapper">
        <h1>Sign In</h1>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" />
      </div>
      <div class="input_wrapper">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
      <div class="buttons_wrapper">
        <button type="submit" class="signin_btn" @click="signin">
          <span>Sign In</span>
        </button>
        <p class="btn_title">Or Sign In with</p>
        <button @click="signInGoogle" class="google_btn">
          <img
            src="../assets/google.png"
            alt=""
            width="30px"
            height="auto"
          /><span>Sign in with Google</span>
        </button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link :to="route.register">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      route: {
        register: "/register",
        main: "/"
      }
    };
  },
  methods: {
    ...mapActions("user", ["login", "signInWithGoogle"]),
    signin() {
      this.login({
        email: this.form.email,
        password: this.form.password
      }).then(() => {
        this.form.email = "";
        this.form.password = "";
        this.$router.push({ path: this.route.main });
      });
    },
    signInGoogle() {
      this.signInWithGoogle().then(() => {
        this.$router.push({ path: this.route.main });
      });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  background-color: #fff !important;
  .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    .input_wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      width: 60%;
      h1 {
        align-self: flex-start;
      }
      input {
        height: 1.8rem;
      }
    }
    .buttons_wrapper {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      width: 60%;
      .signin_btn,
      .google_btn {
        width: 100%;
        cursor: pointer;
      }
      .signin_btn {
        padding: 12px 0;
        background-color: #ff4500;
        color: #fff;
        transition: 0.4s ease;
        border: none;
        border-radius: 10px;
        &:hover,
        :active {
          background-color: #fd7341;
        }
      }
      .btn_title {
        width: 100%;
        text-align: center;
      }
      .google_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        span {
          margin-left: 10px;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .wrapper {
    .login_form {
      .input_wrapper,
      .buttons_wrapper {
        width: 70%;
      }
    }
  }
}
</style>
