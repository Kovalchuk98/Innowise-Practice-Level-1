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
        <button @click="signInWithGoogle" class="google_btn">
          G
        </button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </div>
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["error"]),
    message() {
      return this.error;
    }
  },
  methods: {
    signin() {
      this.$store
        .dispatch("login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.form.email = "";
          this.form.password = "";
          this.$router.push("/");
        });
    },
    signInWithGoogle() {
      this.$store.dispatch("signInWithGoogle").then(() => {
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    background-color: #fff !important;
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
        padding: 10px 0;
      }
      .btn_title {
        width: 100%;
        text-align: center;
      }
      .google_btn {
        padding: 10px 0;
      }
    }
  }
}
</style>
