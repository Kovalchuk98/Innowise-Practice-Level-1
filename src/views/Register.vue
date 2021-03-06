<template>
  <div class="wrapper">
    <div class="login_form">
      <div class="input_wrapper">
        <h1>Sign Up</h1>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" />
      </div>
      <div class="input_wrapper">
        <label for="name">Display Name</label>
        <input type="name" id="name" v-model="form.displayName" />
      </div>
      <div class="input_wrapper">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
      <div class="input_wrapper">
        <label for="confpass">Confirm Password</label>
        <input type="password" id="confpass" v-model="form.confpass" />
      </div>
      <div class="buttons_wrapper">
        <button type="submit" class="signup_btn" @click="register">
          <span>Sign Up</span>
        </button>
      </div>
      <div>
        <p>
          Already have an account?
          <router-link :to="route.signin">Sign In</router-link>
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
        password: "",
        displayName: "",
        confpass: ""
      },
      route: {
        signin: "/signin",
        main: "/"
      }
    };
  },
  methods: {
    ...mapActions("user", ["signup"]),
    register() {
      if (this.form.password === this.form.confpass) {
        this.signup({
          email: this.form.email,
          password: this.form.password,
          displayName: this.form.name
        }).then(() => {
          this.$router.push({ path: this.route.main });
        });
      } else {
        this.$toast.warning("Please make sure your passwords match");
      }
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
      width: 80%;
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
      width: 80%;
      .signup_btn {
        cursor: pointer;
        width: 100%;
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
