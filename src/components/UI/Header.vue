<template>
  <div class="header">
    <router-link to="/" class="header_title">Clever To-Do List</router-link>
    <div class="wrapper_block" v-if="user">
      <div class="user_wrapper">
        <img
          class="user_img"
          :src="user.photoURL || require('../../assets/noimg.png')"
          alt="User Avatar"
          width="34px"
          height="34px"
        />
        <span class="user_name">{{ user.displayName || user.email }}</span>
      </div>
      <button @click="logout" class="signout_btn">Sign Out</button>
      <div @click="$emit('show-menu')" class="wrapper">
        <div class="burger"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      require: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/signin");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  margin: 0.5rem 2rem;
  .header_title {
    text-decoration: none;
    color: #363636;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .user_wrapper {
    display: flex;
    align-items: center;
    .user_img {
      border-radius: 17px;
    }
    .user_name {
      margin-left: 0.3rem;
    }
  }
  .wrapper_block {
    display: flex;
    align-items: center;
    .signout_btn {
      cursor: pointer;
      border: none;
      border-radius: 1.6rem;
      color: #fff;
      margin-left: 1rem;
      padding: 8px 16px;
      background-color: #4c00ff;
      transition: 0.2s linear;
      &:hover,
      :active {
        background-color: #7036f7;
      }
    }
  }
}
</style>
