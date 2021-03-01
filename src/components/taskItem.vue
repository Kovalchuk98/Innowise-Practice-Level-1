<template>
  <div class="item_wrapper">
    <div class="wrapper_check">
      <input
        v-model="task.completed"
        type="checkbox"
        name="task"
        :id="task.id"
        @change="toogle(task)"
      />
      <label :for="task.id">{{ task.title }}</label>
    </div>
    <button @click="$router.push({ name: 'task', params: { id: task.id } })">
      ...
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
  },
  data() {
    return {
      // completed: this.task.completed
    };
  },
  methods: {
    toogle(task) {
      this.$store.dispatch("toogle", task);
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
