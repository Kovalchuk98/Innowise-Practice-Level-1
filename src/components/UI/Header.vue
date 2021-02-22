<template>
  <div class="header">
    <span><router-link to="/">Clever To-Do List</router-link></span>
    <div class="wrapper_block">
      <div class="user_wrapper">
        <img
          class="user_img"
          :src="require('../../assets/noimg.png')"
          alt="User Avatar"
          width="40px"
          height="40px"
        />
        <span class="user_name">UserName</span>
      </div>
      <div @click="$emit('show-menu')" class="wrapper">
        <div class="burger"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  display: flex;
  //   position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(205, 202, 207);
  .user_wrapper {
    display: flex;
    // align-self: center;
    align-items: center;
    .user_img {
      border-radius: 20px;
    }
    .user_name {
      margin-left: 0.3rem;
    }
  }
  .wrapper_block {
    display: flex;
    align-items: center;
  }
}
</style>
