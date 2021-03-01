<template>
  <div class="calendar_wrapper">
    <div
      v-for="(day, index) in days"
      :key="index"
      class="day_wrapper"
      @click="select(day, index)"
      :class="[activeIndex === index ? 'activeClass' : '']"
    >
      <span>{{ day.weekday }}</span>
      <span>{{ day.number }}</span>
      <span>{{ day.flag }}</span>
      <div class="points_wrapper" :class="taskColor">
        <span>•</span>
        <span>•</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    days: {
      type: Array,
      required: true
    },
    taskFlag: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      activeIndex: -1,
      selectDay: null
    };
  },
  computed: {
    taskColor() {
      let color;
      // if (this.taskFlag >= 1 && this.taskFlag < this.taskLength) {
      if (this.taskFlag >= 1 && this.taskFlag < this.taskLength) {
        color = "light";
      } else {
        color = "darker";
      }
      return color;
      // return this.taskFlag >= 1 && this.taskFlag < this.taskLength
      //   ? "darker"
      //   : "darker";
    }
  },
  methods: {
    select(day, index) {
      let number = "";
      if (day.number.toString().length < 2) {
        number = "0" + day.number;
      } else {
        number = day.number;
      }
      let str = `${day.year}-${day.month}-${number}`;
      console.log(str);
      index == 0 ? (this.activeIndex = -1) : (this.activeIndex = index);

      this.$emit("select", str);
    }
  }
};
</script>

<style lang="scss">
.activeClass {
  border: 2px solid rgb(252, 166, 7) !important;
}
.calendar_wrapper {
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  overflow-y: auto;
  h1 {
    padding: 0;
    margin: 0;
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
    .light {
      span:first-of-type {
        color: rgb(240, 185, 6);
      }
      &:last-of-type {
        color: rgb(255, 8, 0);
      }
    }
    .darker {
      span:first-of-type {
        display: none;
      }
      &:last-of-type {
        color: rgb(255, 8, 0);
      }
    }
  }
}
</style>
