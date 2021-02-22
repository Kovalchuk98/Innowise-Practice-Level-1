<template>
  <div class="menuWrapper">
    <nav v-if="menuOn" class="menuWrapper__nav">
      <div @click="$emit('hide-menu')" class="menuWrapper__close"></div>
      <ul class="menuWrapper__list">
        <li class="menuWrapper__item">
          <i class="far fa-star"></i> <a href="#">Favourites</a>
        </li>
        <li class="menuWrapper__item">
          <i class="far fa-bell"></i> <a href="#">Alerts</a>
        </li>
        <!-- <li class="menuWrapper__item">
          <i class="far fa-envelope"></i> <a href="#">Messages</a>
        </li>
        <li class="menuWrapper__item">
          <i class="far fa-comments"></i> <a href="#">Comments</a>
        </li>
        <li class="menuWrapper__item">
          <i class="far fa-chart-bar"></i> <a href="#">Analytics</a>
        </li>
        <li class="menuWrapper__item">
          <i class="fas fa-book-open"></i> <a href="#">Reading</a>
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lanc="scss"></style>
