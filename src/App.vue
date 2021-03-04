<template>
  <div id="app">
    <Header :user="user" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/UI/Header.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    user() {
      return this.getUser;
    }
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 400px;
  max-height: 100%;
  border: none;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter {
  transition: 0.3s ease;
  transform: translateY(-100%);
}
.fade-enter-to {
  transition: 0.3s ease;
  transform: translateX(0%);
}
.fade-leave {
  transition: 0.3s ease;
  transform: translateX(0%);
}
.fade-leave-to {
  transition: 0.3s ease;
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.6s ease;
}

@media (min-width: 320px) {
  #app {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 762px;
  }
}

@media (min-width: 768px) {
  #app {
    border: 1px solid rgb(212, 212, 212);
  }
}

@media (min-width: 1024px) {
  #app {
    margin-top: 5%;
  }
}
</style>
