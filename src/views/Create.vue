<template>
  <div>
    <h1>Create new task</h1>
    <form action="" @submit.prevent class="form_wrapper">
      <label for="">Title</label>
      <input type="text" name="" id="" v-model="title" />
      <label for="">Description</label>
      <textarea class="textarea" name="" id="" v-model="descr" />
      <label for="">Date</label>
      <input type="date" name="" id="" v-model="taskdate" />
      <button class="add_btn" @click="addtask">Add a new task</button>
    </form>
  </div>
</template>

<script>
export default {
  // props: {
  //   task: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      title: "",
      descr: "",
      taskdate: "",
      completed: false
    };
  },
  methods: {
    addtask() {
      this.$store.dispatch("addtask", {
        title: this.title,
        descr: this.descr,
        taskdate: this.taskdate,
        completed: this.completed
      });
    }
  }
};
</script>

<style lang="scss">
.form_wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  .textarea {
    padding: 0;
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
