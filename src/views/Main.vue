<template>
  <div class="main">
    <calendar />
    <!-- <h1>Main Page</h1> -->
    <taskList :taskArray="taskArray" />
  </div>
</template>

<script>
import calendar from "@/components/calendar.vue";
import taskList from "@/components/taskList.vue";
import { mapGetters } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      taskArray: []
    };
  },
  components: {
    calendar,
    taskList
  },
  computed: {
    ...mapGetters(["getTasks"])
  },
  created() {
    this.taskArray = this.getTasks;
  }
};
</script>
