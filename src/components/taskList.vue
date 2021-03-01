<template>
  <div class="list_wrapper">
    <taskItem v-for="task in taskArray" :key="task.id" :task="task" />
    <button class="add_btn" @click="$router.push('/create')">
      Add a new task
    </button>
  </div>
</template>

<script>
import taskItem from "@/components/taskItem.vue";
export default {
  components: {
    taskItem
  },
  props: {
    taskArray: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {
    lengthTasks() {
      return !!Object.keys(this.taskArray).length;
    }
  }
};
</script>

<style lang="scss">
.list_wrapper {
  display: flex;
  flex-direction: column;
  .add_btn {
    align-self: center;
    padding: 12px;
    width: 220px;
    border-radius: 50px;
    border: none;
    margin: 2rem auto;
    cursor: pointer;
    background-color: #ff4500;
    color: #fff;
    transition: 0.2s linear;
    &:hover,
    :active {
      background-color: #ff7746;
    }
  }
}
</style>
