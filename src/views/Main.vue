<template>
  <div class="main">
    <calendar
      :days="daysArray"
      @select="select"
      :taskLength="taskLength"
      ref="cal"
    />
    <h3 v-if="taskLength == 0">No tasks today</h3>
    <taskList :taskArray="tasks" :tday="tday" />
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
      daysArray: [],
      tday: null
    };
  },
  components: {
    calendar,
    taskList
  },
  computed: {
    ...mapGetters("tasks", ["getTasks", "getAllTasks"]),
    tasks() {
      return this.getTasks;
    },
    tasksAll() {
      return this.getAllTasks;
    },
    taskLength() {
      return Object.keys(this.tasks).length;
    }
  },
  created() {
    this.$store.dispatch("tasks/fetchFromDb");
    this.$store.dispatch("tasks/initToday");
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
      let daysnextmonth = [];
      let month = now.getMonth();
      let month2 = now.getMonth() + 1;
      if (month.toString().length < 2) month = "0" + (month + 1);
      if (month2.toString().length < 2) month2 = "0" + (month2 + 1);
      let year = now.getFullYear();
      let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (var i = today, l = days; i <= l; i++) {
        if (i.toString().length < 2) i = "0" + i;
        var d = new Date(year, month - 1, i);
        daysarray.push({
          number: i,
          month: month,
          year: year,
          weekday: weekday[d.getDay()]
        });
      }
      for (var i2 = 1; i2 <= days2; i2++) {
        if (i2.toString().length < 2) i2 = "0" + i2;
        var d2 = new Date(year, month2 - 1, i2);
        daysnextmonth.push({
          number: i2,
          month: month2,
          year: year,
          weekday: weekday[d2.getDay()]
        });
      }
      this.daysArray = daysarray.concat(daysnextmonth).slice(0, 30);
    },
    select(day) {
      this.$store.dispatch("tasks/getDayTasks", day);
      this.tday = day;
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
}
</style>
