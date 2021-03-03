<template>
  <div class="calendar_wrapper">
    <calendar-item
      v-for="(day, index) in days"
      :key="index"
      @select="select"
      :class="[activeIndex === index ? 'activeClass' : '']"
      :day="day"
      :index="index"
      :activeFlag="
        activeDays.includes(`${day.year}-${day.month}-${day.number}`)
      "
      :doneFlag="doneDays.includes(`${day.year}-${day.month}-${day.number}`)"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CalendarItem from "@/components/calendarItem.vue";
export default {
  props: {
    days: {
      type: Array,
      required: true
    },
    taskLength: {
      type: Number,
      required: true
    }
  },
  components: {
    CalendarItem
  },
  data() {
    return {
      activeIndex: -1,
      selectDay: null
    };
  },
  created() {
    this.checkStatus();
  },
  computed: {
    ...mapGetters(["getAllTasks", "getDoneDays", "getActiveDays"]),
    tasksAll() {
      return this.getAllTasks;
    },
    activeDays() {
      return this.getActiveDays;
    },
    doneDays() {
      return this.getDoneDays;
    }
  },
  methods: {
    select({ idx, day }) {
      idx === 0 ? (this.activeIndex = -1) : (this.activeIndex = idx);
      this.$emit("select", day);
    },
    checkStatus() {
      let activeArray = [];
      let doneArray = [];
      let obj = this.tasksAll;
      Object.entries(obj).forEach(dates => {
        Object.entries(dates[1]).forEach(task => {
          if (task[1].completed === true) {
            if (!doneArray.includes(dates[0])) doneArray.push(dates[0]);
          } else if (!activeArray.includes(dates[0]))
            activeArray.push(dates[0]);
        });
      });
      this.$store.commit("setActiveDays", activeArray);
      this.$store.commit("setDoneDays", doneArray);
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
}
</style>
