<template>
  <div class="day_wrapper" @click="select(index)">
    <span>{{ day.weekday }}</span>
    <span>{{ day.number }}</span>
    <div class="points_wrapper">
      <span class="active" v-if="doneFlag">•</span>
      <span class="done" v-if="activeFlag">•</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    doneFlag: {
      type: Boolean,
      required: true
    },
    activeFlag: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    select(index) {
      let str = `${this.day.year}-${this.day.month}-${this.day.number}`;
      this.$emit("select", { idx: index, day: str });
    }
  }
};
</script>

<style lang="scss" scoped>
.activeClass {
  border: 2px solid rgb(252, 166, 7) !important;
}
.day_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px 18px;
  border-radius: 1rem;
  margin: 0 0.4rem;
  background-color: #fff;
  border: 2px solid rgb(201, 201, 201);
  font-weight: bolder;
  color: rgb(133, 133, 133);
  cursor: pointer;
  &:first-child {
    background-color: black;
    border: none;
  }
  .points_wrapper {
    display: flex;
    position: absolute;
    bottom: -15px;
  }
  .active {
    color: rgb(240, 185, 6);
  }
  .done {
    color: rgb(255, 8, 0);
    margin-left: 1px;
  }
}
</style>
