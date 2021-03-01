<template>
  <div class="task_wrapper">
    <p>{{ task.title }}</p>
    <hr />
    <p>{{ task.descr }}</p>
    <p>Status: {{ taskStatus }}</p>
    <button class="btn" @click="edit(task)">Edit</button>
    <!-- <router-link class="btn" to="/create">Edit</router-link> -->
    <button class="btn" @click="deleteTask(task)">Delete</button>
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
    ...mapGetters(["getTasks"]),
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
      console.log(this.task);
    }
  },
  methods: {
    edit(task) {
      this.$router.push({ path: "/create", props: true, params: task });
    },
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss">
.task_wrapper {
  padding: 2%;
  margin: 0 auto;
  width: 80%;
  background-color: rgb(235, 235, 235);
  border-radius: 1rem;
}
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
</style>
