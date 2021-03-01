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
        <input type="confpasss" id="confpass" v-model="form.confpass" />
      </div>
      <div class="buttons_wrapper">
        <button type="submit" class="signup_btn" @click="signup">
          <span>Sign Up</span>
        </button>
      </div>
      <div>
        <p>
          Already have an account?
          <router-link to="/signin">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        displayName: "",
        confpass: ""
      }
    };
  },
  methods: {
    signup() {
      if (this.form.password === this.form.confpass) {
        this.$store
          .dispatch("signup", {
            email: this.form.email,
            password: this.form.password,
            displayName: this.form.name
          })
          .then(() => this.$router.push({ path: "/" }));
      } else {
        this.$toast.warning("Please make sure your passwords match");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
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
      .signup_btn {
        width: 100%;
        padding: 10px 0;
      }
    }
  }
}
</style>
