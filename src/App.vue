<template>
  <div id="app">
    <Header />
    <!-- <div id="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/signin">Sign In</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/UI/Header.vue";
export default {
  components: {
    Header
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
  // text-align: center;
  color: #2c3e50;
  background-color: rgb(240, 239, 239);
  min-height: 400px;
  max-height: auto;
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
