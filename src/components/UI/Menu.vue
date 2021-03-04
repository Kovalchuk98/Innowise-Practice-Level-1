<template>
  <transition name="fade">
    <div class="menuWrapper">
      <button @click="$emit('hide')" class="menuWrapper__close">X</button>
      <div v-if="user" class="user_wrapper">
        <img
          class="user_img"
          :src="user.photoURL || require('../../assets/noimg.png')"
          alt="User Avatar"
          width="34px"
          height="34px"
        />
        <span class="user_name">{{ user.displayName || user.email }}</span>
      </div>
      <div class="btn_wrapper" v-if="!user">
        <button @click="signin">
          Sign In
        </button>
        <button @click="signup">Sign Up</button>
      </div>
      <div v-else class="btn_wrapper">
        <button @click="logout" class="button_out">
          Sign Out
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    signin() {
      this.$router.push("/signin");
      this.$emit("hide");
    },
    signup() {
      this.$router.push("/register");
      this.$emit("hide");
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/signin");
        this.$emit("hide");
      });
    }
  }
};
</script>

<style lang="scss">
.menuWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  background-color: #d8421d !important;
  width: 60%;
  height: 100vh;
  top: 0;
  left: -100%;
  z-index: 9999;
  .user_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    .user_img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    .user_name {
      color: #fff;
      font-size: 1.2rem;
      margin-top: 10px;
    }
  }
  .btn_wrapper,
  .button_out {
    margin-top: 10px;
    width: 100%;
  }
  .button_out {
    display: block;
    cursor: pointer;
    padding: 12px 0;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #ee9a85;
    background-color: transparent;
  }
  .btn_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    button {
      cursor: pointer;
      padding: 12px 0;
      color: #fff;
      border-radius: 10px;
      border: 1px solid #ee9a85;
      background-color: transparent;
      &:last-of-type {
        margin-top: 5px;
      }
    }
  }
  .menuWrapper__close {
    cursor: pointer;
    width: 40px;
    height: 40px;
    align-self: flex-end;
    border-radius: 20px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #ee9a85;
    margin: 5px;
  }
}
</style>
