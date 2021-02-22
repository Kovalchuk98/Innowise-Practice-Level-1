<template>
  <div>
    <taskItem v-for="task in taskArray" :key="task.id" :task="task" />
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
      type: Array,
      require: true
    }
  },
  data() {
    return {
      //   taskArray: [
      //     {
      //       id: 1,
      //       title: "delectus aut autem",
      //       completed: false
      //     },
      //     {
      //       id: 2,
      //       title: "quis ut nam facilis et officia qui",
      //       completed: false
      //     },
      //     {
      //       id: 3,
      //       title: "fugiat veniam minus",
      //       completed: false
      //     },
      //     {
      //       id: 4,
      //       title: "et porro tempora",
      //       completed: false
      //     },
      //     {
      //       id: 5,
      //       title:
      //         "laboriosam mollitia et enim quasi adipisci quia provident illum",
      //       completed: false
      //     }
      //   ]
    };
  }
};
</script>

<style></style>
