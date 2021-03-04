<template>
  <div>
    <div class="form_wrapper">
      <h2>{{ editing ? "Edit task" : "Create new task" }}</h2>
      <label for="">Title</label>
      <input type="text" name="" id="" v-model="ndata.title" />
      <label for="">Description</label>
      <textarea class="textarea" name="" id="" v-model="ndata.descr" />
      <label for="">Date</label>
      <input type="date" name="" id="" v-model="ndata.taskdate" />
      <button v-if="!editing" class="add_btn" @click="createTask">
        Save
      </button>
      <button v-else class="add_btn" @click="updateTask">Update</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let temp = Object.freeze({
  title: "",
  descr: "",
  date: "",
  completed: false
});
export default {
  data() {
    return {
      ndata: Object.assign({}, temp),
      editing: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["getTasks"]),
    tasks() {
      return this.getTasks;
    }
  },
  created() {
    if ("id" in this.$route.params) {
      this.getTaskById();
      this.editing = true;
    } else {
      this.editing = false;
    }
  },
  methods: {
    createTask() {
      if (this.ndata.title !== "") {
        this.$store
          .dispatch("tasks/addTask", {
            title: this.ndata.title,
            descr: this.ndata.descr,
            taskdate: this.ndata.taskdate,
            completed: this.ndata.completed
          })
          .then(() => {
            (this.ndata.title = ""),
              (this.ndata.descr = ""),
              (this.ndata.date = "");
            this.$router.push("/");
          });
      } else {
        this.$toast.warning("Please enter title");
      }
    },
    updateTask() {
      if (this.ndata.title !== "") {
        this.$store
          .dispatch("tasks/editTask", {
            title: this.ndata.title,
            descr: this.ndata.descr,
            taskdate: this.ndata.date,
            id: this.$route.params.id
          })
          .then(() => {
            (this.ndata.title = ""),
              (this.ndata.descr = ""),
              (this.ndata.date = "");
            this.$router.push("/");
          });
      } else {
        this.$toast.warning("Please enter title");
      }
    },
    getTaskById() {
      let data = null;
      let obj = this.tasks;
      for (let key in obj) {
        if (obj[key].id == this.$route.params.id) {
          data = obj[key];
        }
      }
      this.ndata = data;
    }
  }
};
</script>

<style lang="scss">
.form_wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  input {
    padding: 10px 0;
  }
  .textarea {
    resize: none !important;
  }
  .add_btn {
    margin: 10px auto;
    padding: 12px;
    width: 220px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background-color: orangered;
    color: #fff;
    transition: 0.2s linear;
    &:hover,
    :checked {
      background-color: rgb(221, 80, 29);
    }
  }
}
</style>
