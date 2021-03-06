<template>
  <div class="main">
    <calendar :days="daysArray" @select="select" :taskLength="taskLength" />
    <h3 v-if="taskLength === 0">No tasks today</h3>
    <taskList :taskArray="tasks" :tday="tday" />
  </div>
</template>

<script>
import calendar from "@/components/calendar.vue";
import taskList from "@/components/taskList.vue";
import { mapActions, mapGetters } from "vuex";

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
    this.fetchFromDb();
    this.getCalendar();
    this.initToday();
  },
  methods: {
    ...mapActions("tasks", ["fetchFromDb", "initToday", "getDayTasks"]),
    getCalendar() {
      const now = new Date();
      const today = now.getDate();
      const daysInCurMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      const daysInNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 2,
        0
      ).getDate();
      const daysarray = [];
      const daysnextmonth = [];
      let currentMonth = now.getMonth();
      let nextMonth = now.getMonth() + 1;
      if (currentMonth.toString().length < 2)
        currentMonth = "0" + (currentMonth + 1);
      if (nextMonth.toString().length < 2) nextMonth = "0" + (nextMonth + 1);
      const year = now.getFullYear();
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      for (let i = today, l = daysInCurMonth; i <= l; i++) {
        if (i.toString().length < 2) i = "0" + i;
        let d = new Date(year, currentMonth - 1, i);
        daysarray.push({
          number: i,
          month: currentMonth,
          year: year,
          weekday: weekday[d.getDay()]
        });
      }
      for (let i = 1; i <= daysInNextMonth; i++) {
        if (i.toString().length < 2) i = "0" + i;
        let d2 = new Date(year, nextMonth - 1, i);
        daysnextmonth.push({
          number: i,
          month: nextMonth,
          year: year,
          weekday: weekday[d2.getDay()]
        });
      }
      this.daysArray = daysarray.concat(daysnextmonth).slice(0, 30);
    },
    select(day) {
      this.getDayTasks(day);
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
