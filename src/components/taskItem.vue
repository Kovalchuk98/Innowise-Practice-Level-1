<template>
  <div class="item_wrapper">
    <div class="wrapper_check">
      <input
        v-model="status"
        type="checkbox"
        name="task"
        :id="task.id"
        @change="toogleTask(task)"
      />
      <label :for="task.id">{{ task.title }}</label>
    </div>
    <div>
      <button
        class="detail_btn"
        @click="$router.push({ name: 'task', params: { id: task.id } })"
      >
        Details
      </button>
      <button
        class="edit_btn"
        @click="
          $router.push({
            path: `/task/edit/${task.id}`,
            params: { id: task.id }
          })
        "
      >
        <img src="../assets/pencil.svg" alt="" width="15px" height="auto" />
      </button>
      <button class="remove_btn" @click="remove(task)">
        <img src="../assets/remove.svg" alt="" width="15px" height="auto" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    task: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      status: this.task.completed
    };
  },
  methods: {
    ...mapActions("tasks", ["toogle", "deleteTask"]),
    toogleTask(task) {
      this.toogle({ date: task.date, id: task.id, status: this.status });
    },
    remove(task) {
      this.deleteTask({ date: task.date, id: task.id });
    }
  }
};
</script>

<style lang="scss">
.item_wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px 0;
  border: 1px solid #d1d1d1;
  border-radius: 1.2rem;
  padding: 8px;
  .wrapper_check {
    display: flex;
    align-items: center;
    input,
    label {
      cursor: pointer;
    }
    label {
      margin-left: 5px;
    }
  }
  .detail_btn,
  .edit_btn,
  .remove_btn {
    margin-left: 5px;
    border: none;
    padding: 5px 8px;
    border: 1px solid #b3b1b1;
    border-radius: 10px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  .detail_btn {
    background-color: #ff4500;
    color: #fff;
    transition: 0.2s ease;
    &:hover,
    :active {
      background-color: #ff7746;
    }
  }
  .edit_btn {
    background-color: #d3e477;
    color: #fff;
    transition: 0.2s ease;
    &:hover,
    :active {
      background-color: #f0fcaf;
    }
  }
  .remove_btn {
    background-color: #f1f1f1;
    transition: 0.2s ease;
    &:hover,
    :active {
      background-color: #c4c4c4;
    }
  }
}
</style>
