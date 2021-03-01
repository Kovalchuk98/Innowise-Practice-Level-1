<template>
  <div class="main">
    <calendar
      :days="daysArray"
      @select="select"
      :taskFlag="taskFlag"
      :taskLength="taskLength"
    />
    <h3 v-if="!taskLength">No tasks today</h3>
    <taskList v-else :taskArray="tasks" />
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
      taskArray: [],
      daysArray: []
    };
  },
  components: {
    calendar,
    taskList
  },
  computed: {
    ...mapGetters(["getTasks"]),
    tasks() {
      return this.getTasks;
    },
    taskLength() {
      return !!Object.keys(this.tasks).length;
    },
    taskFlag() {
      let counter = 0;
      let obj = this.tasks;
      for (let key in obj) {
        if (obj[key].completed) counter++;
      }
      return counter;
    }
    // colorFlag() {
    //   return this.counter
    // }
  },
  created() {
    this.$store.dispatch("fetchFromDb");
    this.getCalendar();
  },
  methods: {
    getCalendar() {
      const now = new Date();
      let today = now.getDate();
      const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const days2 = new Date(
        now.getFullYear(),
        now.getMonth() + 2,
        0
      ).getDate();
      let daysarray = [];
      let month = now.getMonth();
      let month2 = now.getMonth() + 1;
      if (month.toString().length < 2) month = "0" + (month + 1);
      if (month2.toString().length < 2) month2 = "0" + (month2 + 1);
      let year = now.getFullYear();
      let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (var i = today, l = days; i <= l; i++) {
        var d = new Date(year, month - 1, i);
        daysarray.push({
          number: i,
          month: month,
          year: year,
          // flag: this.taskFlag,
          weekday: weekday[d.getDay()]
        });
      }
      for (var i2 = 1; i2 <= days2; i2++) {
        var d2 = new Date(year, month2 - 1, i2);
        daysarray.push({
          number: i2,
          month: month2,
          year: year,
          weekday: weekday[d2.getDay()]
        });
      }
      this.daysArray = daysarray.slice(0, 30);
    },
    select(day) {
      this.$store.dispatch("getDayTasks", day);
      console.log(day);
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
