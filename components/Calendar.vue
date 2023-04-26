<template>
  <v-row class="main-calendar">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>

          <div class="toolbar-arrows">
            <v-btn class="color" small outlined @click="prev">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-btn class="color" small outlined @click="next">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">

              <v-btn class="color btn-set-type" outlined v-bind="attrs" v-on="on">
                <span class="type-label">{{ typeToLabel[type] }}</span>
                <v-icon >mdi-chevron-down</v-icon>
              </v-btn>

            </template>

            <v-list>
              <v-list-item @click="setViewType('day')">
                <v-list-item-title>{{ typeToLabel.day }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="setViewType('week')">
                <v-list-item-title>{{ typeToLabel.week }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="setViewType('month')">
                <v-list-item-title>{{ typeToLabel.month }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-sheet class="calendar-content" height="740">

        <v-calendar
          ref="calendar"
          v-model="focus"
          locale="Ru-ru"
          event-more-text="{0} еще"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          show-week
        >
          <template v-slot:day-label="{ day, date }">
            <v-btn elevation="0" fab color="white" @click="setEventDay(date)">{{ day }}</v-btn> <!--открывает окно события-->
          </template>
          <template v-slot:event="{ eventParsed, event }">
            <v-layout :class="['event-row', type]" :style="getEventStyle(event.type)">
              <p class="event-auditorium">{{ getEventAuditorium(event.auditorium) }}</p>
              <v-layout class="event-info">
                <v-layout class="event-info-inner"
                          :style="'background-color:'+getRgbaFromHex(getEventColor(event.type), '0.15')">
                  <p class="event-start">{{ eventParsed.start.time }}</p>
                  <p class="event-name">{{ event.name }}</p>
                </v-layout>
              </v-layout>
            </v-layout>
          </template>
        </v-calendar>

        <event-edit v-if="selectedEvent" :visible="selectedEvent !== null" :event="selectedEvent" @close="selectedEvent = null" /> <!--закрывает окно события-->

<!--        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>-->
<!--          <v-card color="grey lighten-4" min-width="350px" flat>-->
<!--            <v-toolbar :color="selectedEvent.color" dark>-->

<!--              <v-btn icon>-->
<!--                <v-icon>mdi-pencil</v-icon>-->
<!--              </v-btn>-->

<!--              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>-->

<!--              <v-spacer></v-spacer>-->

<!--              <v-btn icon>-->
<!--                <v-icon>mdi-heart</v-icon>-->
<!--              </v-btn>-->

<!--              <v-btn icon>-->
<!--                <v-icon>mdi-dots-vertical</v-icon>-->
<!--              </v-btn>-->
<!--            </v-toolbar>-->

<!--            <v-card-text>-->
<!--              <span v-html="selectedEvent.details"></span>-->
<!--            </v-card-text>-->

<!--            <v-card-actions>-->
<!--              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-menu>-->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import calendarModels from '@/models/calendar';
export default {
  props: ['events'],

  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Месяц',
      week: 'Неделя',
      day: 'День'
    },
    selectedEvent: null,
    selectedElement: null,
    selectedOpen: false
  }),

  mounted () {
    this.$refs.calendar.checkChange();
    this.updateWeekNumbers();
  },

  watch: {
    events(){
      this.updateWeekNumbers();
    }
  },

  methods: {
    
    setViewType (type) {
      this.type = type;
      const that = this;
      setTimeout(() => that.updateWeekNumbers(), 0);
    },

    setEventDay ( date ) {
      this.$emit('setEvent', date);
    },

    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },

    getRgbaFromHex (hex, alpha) {
      if(!hex) return;

      let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

      if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    },

    prev () {
      this.$refs.calendar.prev();
      this.updateWeekNumbers();
    },

    next () {
      this.$refs.calendar.next();
      this.updateWeekNumbers();
    },

    updateWeekNumbers () {
      const calendar = this.$refs.calendar.$el;

      setTimeout(() => {
        calendar.querySelectorAll('.v-calendar-weekly__weeknumber').forEach((el) => {
          const title_element = el.querySelector('small');
          const number = parseInt(title_element.innerText);
          if(number) {
            el.classList.add(number % 2 === 0 ? "odd" : "even");
          }
        });
      }, 0);
    },

    showEvent ({ nativeEvent, event }) {
      this.selectedEvent = event;
      this.$store.state.selectedEvent = event;
      nativeEvent.stopPropagation();
    },

    getEventAuditorium (id) {
      return calendarModels.auditoriums.find(item => item.id === id)?.name;
    },

    getEventStyle (id) {
      const color = this.getEventColor(id);
      return `background-color: ${color}; border-color: ${color}`;
    },

    getEventColor (id) {
      return calendarModels.types.find(item => item.id === id)?.color;
    }
  },
}
</script>

<style lang="scss">

.main-calendar {

  .theme--light.v-calendar {
    max-width: 1100px;
    margin: 0 auto;
    border-top: none;
    border-left: none;
  }

  .calendar-content {
    padding-top: 40px;
  }

  .v-event-timed-container {
    margin-right: 0;

    .v-event-timed {
      min-height: 30px;
      background: none !important;
    }
  }

  .color {
    color: $color;
  }

  .v-calendar-daily_head-day-label {
    .v-btn__content {
      font-size: 16px !important;
    }
  }

  .v-calendar-daily__head {
    .v-calendar-daily_head-day {
      border: none;

      .v-calendar-daily_head-weekday {
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    & > * {
      height: 50px!important;
    }
  }

  .v-calendar-daily__intervals-head {
    opacity: 0;
  }

  .v-calendar-daily__body {
    margin-top: 20px;
  }

  .v-calendar-weekly__head {
    border-bottom: none;
    border-bottom: 1px solid $color-border;

    .v-calendar-weekly__head-weeknumber {
      width: 40px;
      flex: none;
      opacity: 0;
    }

    .v-calendar-weekly__head-weekday {
      font-size: 16px;
      background: none !important;
      border: none;
    }
  }

  .v-calendar-weekly__week {
    .v-calendar-weekly__day {
      border-color: $color-border;

      &.v-outside {
        background: #fff;
      }

      .v-calendar-weekly__day-label {
        margin-top: 0;
      }

      .v-event-more {
        color: $color;
        font-family: $ff;
        text-align: right;
        padding-right: 5px;
      }

      .v-event {
        width: auto !important;
        height: auto !important;
        background: none !important;
        border: none !important;
        margin: 0 2px;
      }
    }
  }

  .v-calendar-weekly__weeknumber {
    width: 40px;
    flex: none;
    padding-top: 0;
    justify-content: center;
    opacity: .5;
    transition: opacity .5s ease;
    border-left: 1px solid $color-border;

    &.odd {
      background: #ECECFF;
      opacity: 1;

      &::after {
        content: 'четная';
      }
    }

    &.even {
      opacity: 1;
      background: #F5F5FF;

      &::after {
        content: 'нечетная';
      }
    }

    &::after {
      display: inline-block;
      font-size: 14px;
      color: $color;
      font-family: $ff;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }

    small {
      display: none;
    }
  }

  .v-toolbar__title {
    font-family: $ff-bold;
    margin-top: 8px;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  .toolbar-arrows {
    margin-right: 20px;
  }

  .btn-set-type {
    width: 200px;
    height: 40px;
    justify-content: space-between;

    .type-label {
      text-transform: none;
      font-family: $ff;
      font-size: 17px;
    }
  }

  .event-row {
    height: 100%;
    border-radius: 8px;
    border: 1px solid;
    margin-top: 5px;

    &.week,
    &.day {
      position: relative;

      .event-auditorium {
        writing-mode: initial;
        transform: none;
        align-self: center;
        margin-right: 2px;
      }

      .event-start {
        position: absolute;
        top: -2px;
        right: 0;
      }

      .event-name {
        margin: 3px 0 0 5px;
      }
    }

    .event-info-inner {
      align-items: center;
    }

    p {
      margin-bottom: 0;
    }

    .event-auditorium {
      font-size: 12px;
      color: #fff;
      text-align: center;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }

    .event-info {
      background-color: #fff;
      border-radius: 6px;

      * {
        font-size: 11px;
      }

      .event-start {
        font-family: $ff-bold;
        margin: 0 5px;
        color: $color !important;
      }

      .event-name {
        font-family: $ff-bold;
        text-overflow: ellipsis;
        overflow: hidden;
        color: $color !important;
      }
    }
  }

  .v-calendar-daily__day {
    .v-calendar-daily__day-interval:first-of-type {
      border-top: 1px solid $color-border !important;
    }
  }

  .v-calendar-daily__day,
  .v-calendar-daily__day-interval,
  .v-calendar-daily_head-day,
  .v-calendar-daily__intervals-head,
  .v-calendar-daily__intervals-body {
    border-color: $color-border !important;
  }

  .v-calendar-daily__interval-text {
    font-size: 12px;
    font-family: $ff-bold;
    color: $color !important;

    &:not(:empty) {
      &::after {
        content: ':00';
      }
    }
  }
}

.v-calendar {
  .v-calendar-daily_head-weekday,
  .v-calendar-weekly__head-weekday {
    color: $color !important;
    font-size: 14px;
    font-family: $ff-bold;
    padding: 10px 0;

    &:not(:last-of-type) {
      border: none !important;
    }
  }

  .v-calendar-weekly__day {
    margin-right: 0 !important;
  }

  .v-btn {
    width: 40px;
    height: 40px;

    &:hover {
      background-color: #351BA9 !important;

      .v-btn__content {
        color: #fff;
        font-size: 16px;
      }
    }

    .v-btn__content {
      color: $color;
      font-size: 12px;
      font-family: $ff-bold;
    }
  }

  .v-present {
    .v-btn {
      background-color: #351BA9 !important;
      border-color: #351BA9 !important;

      .v-btn__content {
        font-size: 16px;
        color: #fff;
        font-family: $ff;
      }
    }
  }
}

.period-calendar {
  .v-calendar-weekly__head {
    border-bottom: 2px solid $color;
  }

  .v-calendar-weekly__head-weekday {
    background: $bg-lt !important;
  }

  .v-present {
    .v-btn {
      background: none !important;
    }
  }
}


</style>
