<template>
  <div class="item_wrapper">
    <div class="wrapper_check">
      <input type="checkbox" name="task" :id="task.id" />
      <label :for="task.id">{{ task.title }}</label>
    </div>
    <button @click="$router.push({ name: 'task', params: { id: task.id } })">
      Task Details
    </button>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      require: true
    }
  }
};
</script>

<style lang="scss">
.item_wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
