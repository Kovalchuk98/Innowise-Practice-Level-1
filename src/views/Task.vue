<template>
  <div class="task_wrapper">
    <p>{{ task.title }}</p>
    <hr />
    <p>{{ task.descr }}</p>
    <p>{{ task.date }}</p>
    <div class="bottom_wrapper">
      <div>
        <button
          class="btn"
          @click="
            $router.push({
              path: `/task/edit/${task.id}`,
              params: { id: task.id }
            })
          "
        >
          Edit
        </button>
        <button class="btn" @click="deleteTask(task)">Delete</button>
      </div>
      <p>
        Status:
        <span :class="[task.completed ? 'done' : 'active']">{{
          taskStatus
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      task: {}
    };
  },
  computed: {
    ...mapGetters("tasks", ["getTasks"]),
    tasks() {
      return this.getTasks;
    },
    taskStatus() {
      return this.task.completed ? "Completed" : "Not completed";
    }
  },
  created() {
    let obj = this.tasks;
    for (let key in obj) {
      if (key == this.$route.params.id) {
        Object.assign(this.task, obj[key]);
      }
    }
  },
  methods: {
    deleteTask(task) {
      this.$store.dispatch("tasks/deleteTask", task).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.task_wrapper {
  padding: 2%;
  margin: 0 auto;
  width: 80%;
  border-radius: 1rem;
  .bottom_wrapper {
    display: flex;
    justify-content: space-between;
    .btn {
      text-decoration: none;
      padding: 7px 10px;
      margin: 0 4px;
      border: none;
      font-size: inherit;
      cursor: pointer;
      background-color: orangered;
      border-radius: 50px;
      color: #fff;
      transition: 0.2s linear;
      &:hover,
      :active {
        background-color: rgb(221, 80, 29);
      }
    }
    span {
      font-weight: bold;
    }
    .active {
      color: rgb(221, 65, 65);
    }
    .done {
      color: rgb(62, 163, 62);
    }
  }
}
</style>
