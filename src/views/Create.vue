<template>
  <div>
    <div class="form_wrapper">
      <router-link to="/" class="wrapper_link"
        ><span class="arrow">←</span><span> Back</span>
      </router-link>
      <h2>{{ editing ? "Edit task" : "Create new task" }}</h2>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="ndata.title" />
      <label for="descr">Description</label>
      <textarea
        class="textarea"
        name="descr"
        id="descr"
        v-model="ndata.descr"
      />
      <template v-if="!editing">
        <label for="date">Date</label>
        <input type="date" name="date" id="date" v-model="ndata.date" />
      </template>
      <button v-if="!editing" class="add_btn" @click="createTask">
        Save
      </button>
      <button v-else class="add_btn" @click="updateTask">Update</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppRoutes from "@/router/approutes";

export default {
  data() {
    return {
      ndata: {
        title: "",
        descr: "",
        date: "",
        completed: false
      },
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
    ...mapActions("tasks", ["addTask", "editTask"]),
    createTask() {
      if (this.ndata.title !== "") {
        this.addTask({
          title: this.ndata.title,
          descr: this.ndata.descr,
          taskdate: this.ndata.date,
          completed: this.ndata.completed
        }).then(() => {
          this.clearForm();
        });
      } else {
        this.$toast.warning("Please enter title");
      }
    },
    updateTask() {
      if (this.ndata.title !== "") {
        this.editTask({
          title: this.ndata.title,
          descr: this.ndata.descr,
          taskdate: this.ndata.date,
          id: this.$route.params.id
        }).then(() => {
          this.clearForm();
        });
      } else {
        this.$toast.warning("Please enter title");
      }
    },
    clearForm() {
      this.ndata.title = "";
      this.ndata.descr = "";
      this.ndata.date = "";
      this.$router.push({ path: AppRoutes.Home });
    },
    getTaskById() {
      const obj = this.tasks;
      this.ndata = Object.values(obj).find(
        item => item.id == this.$route.params.id
      );
    }
  }
};
</script>

<style lang="scss">
.form_wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  .wrapper_link {
    text-decoration: none;
    span {
      text-decoration: none;
      color: black;
      font-size: 20px;
      transition: 0.3s ease;
    }
    .arrow {
      font-size: 24px;
    }
    &:hover {
      span {
        color: orangered;
      }
    }
  }
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
