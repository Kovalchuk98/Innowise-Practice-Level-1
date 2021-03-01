<template>
  <div id="app">
    <Header :user="user" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/UI/Header.vue";
export default {
  components: {
    Header
  },
  computed: {
    user() {
      return this.$store.state.user;
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
  background-color: rgb(255, 255, 255);
  min-height: 400px;
  max-height: 100%;
  border: 1px solid rgb(212, 212, 212);
  // border-radius: 1.2rem;
  // box-shadow: 5px 4px 30px 0px rgb(112, 112, 112);
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

@media (min-width: 320px) {
  #app {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 762px;
  }
}
</style>
