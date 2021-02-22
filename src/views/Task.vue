<template>
  <div class="task_wrapper">
    <p>{{ task.id }}</p>
    <p>{{ task.title }}</p>
    <p>{{ task.completed }}</p>
    <button>Edit</button>
    <button>Delete</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      task: null
    };
  },
  computed: {
    ...mapGetters(["getTasks"])
  },
  created() {
    const taskItem = this.getTasks.find(
      item => item.id == this.$route.params.id
    );
    this.task = taskItem;
    console.log(this.task);
  }
};
</script>

<style lang="scss"></style>
