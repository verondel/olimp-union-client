<template>
  <div class="container v-application">

    <Calendar :events="events" @setEvent="setEvent" />

    <div data-app>
      <event-add v-if="showEventAdd" :repeats="repeats" :date="date" :visible="showEventAdd" :clear="formClear"
                 @repeate="showRepeatsForm" @close="showEventAdd = false" @save="eventSave"/>
    </div>

    <div data-app>
      <event-period v-if="showEventPeriod" :event="event" :date="date" :visible="showEventPeriod" @close="closeEventPeriod()"
                    @save="eventPeriodsSave"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "calendar",

  data: () => ({
    date: '',
    event: {},
    events: [],
    repeats: {},
    showEventAdd: false,
    showEventPeriod: false,
    formClear: false
  }),

  methods: {
    setEvent(date) {
      this.date = date;
      this.formClear = true;
      this.showEventAdd = true;
    },

    closeEventPeriod() {
      this.showEventPeriod = false;
      this.formClear = false;
      this.showEventAdd = true;
    },

    eventPeriodsSave(data) {
      this.formClear = false;
      this.repeats = data;
    },

    showRepeatsForm() {
      this.showEventPeriod = true
      // this.event = data;
    },

    eventSave() {
      this.events = [...this.$store.state.calendar.events];
      this.repeats = [];
    }
  }
}
</script>

