<template>
  <div class="header">
    <mobileMenu v-if="isShow" @hide="isShow = !isShow" :user="user" />
    <div>
      <button class="menu_btn" @click="isShow = !isShow">
        <img src="../../assets/burger.svg" alt="" width="20px" height="auto" />
      </button>
      <router-link to="/" class="header_title">Clever To-Do List</router-link>
    </div>
    <div class="wrapper_block" v-if="user">
      <div class="user_wrapper">
        <img
          class="user_img"
          :src="user.photoURL || require('../../assets/noimg.png')"
          alt="User Avatar"
          width="34px"
          height="34px"
        />
        <!-- :src="user.photoURL || require('../../assets/noimg.png')" -->
        <span class="user_name">{{ user.displayName || user.email }}</span>
      </div>
      <button @click="signout" class="signout_btn">Sign Out</button>
    </div>
  </div>
</template>

<script>
import mobileMenu from "@/components/UI/Menu.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    user: {
      type: Object,
      require: true
    }
  },
  components: {
    mobileMenu
  },
  data() {
    return {
      isShow: false,
      route: {
        signin: "/signin"
      }
    };
  },
  methods: {
    ...mapMutations("tasks", ["setActiveDays", "setDoneDays", "setTasks"]),
    ...mapActions("user", ["logout"]),
    signout() {
      this.logout().then(() => {
        this.setActiveDays([]);
        this.setDoneDays([]);
        this.setTasks(null);
        this.$router.push({ path: this.route.signin });
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
  .menuWrapper {
    position: fixed;
    background-color: rgb(87, 85, 85);
    width: 60%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .menu_btn {
    padding: 5px;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
  .header_title {
    text-decoration: none;
    color: #363636;
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 1rem;
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
    display: none;
    align-items: center;
    .signout_btn {
      cursor: pointer;
      border: none;
      border-radius: 1.6rem;
      color: #fff;
      margin-left: 1rem;
      padding: 6px 12px;
      background-color: #4c00ff;
      transition: 0.2s linear;
      &:hover,
      :active {
        background-color: #7036f7;
      }
    }
  }
  @media (min-width: 768px) {
    .wrapper_block {
      display: flex;
    }
    .menu_btn {
      display: none;
    }
  }
}
</style>
