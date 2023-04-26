<template>
  <v-app justify="center">
    <v-dialog v-model="dialog" persistent max-width="620px">

      <v-card class="modal">
        <div class="modal-inner">
          <v-card-title>
            <span class="modal-title font-als-b font-lg">Повтор мероприятия</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="form">

                <v-row class="form-row">
                  <v-col>
                    <v-item-group multiple v-model="form.days">
                      <v-subheader>Дни повторения</v-subheader>
                      <v-item v-for="n in data.days" :key="n" v-slot="{ active, toggle }">
                        <v-chip :input-value="active" @click="toggle">{{ n }}</v-chip>
                      </v-item>
                    </v-item-group>
                  </v-col>
                </v-row>

                <v-row class="form-row">
                  <v-col>
                    <v-subheader>Окончание</v-subheader>
                    <v-row class="form-row form-row-ends">
                      <v-col cols="5" sm="3">
                        <v-radio-group v-model="form.end.type" mandatory>
                          <v-radio v-for="item in data.ends" :key="item.type" :label="item.name" :value="item.type" />
                        </v-radio-group>
                      </v-col>

                      <v-col cols="7" sm="4">
                        <v-menu v-model="showDatepicker" :close-on-content-click="false" :nudge-right="40"
                          transition="scale-transition" offset-y min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field :class="{'is-hidden': form.end.type !== 'date'}"
                              v-model="dateText" class="form-field form-field-min form-field-date-text bg-dark"
                                          dense outlined readonly hide-details v-bind="attrs" v-on="on"
                            />
                          </template>
                          <v-date-picker v-model="form.end.date" first-day-of-week="1" no-title
                                         locale="ru-RU" @input="showDatepicker = false" />
                        </v-menu>

                        <div :class="['repeats-number', {'is-hidden': form.end.type !== 'repeates'}]">
                          <v-text-field v-model="form.end.repeates" suffix="повторов"
                                        class="form-field form-field-min form-field-date-text bg-dark"
                                        dense outlined hide-details
                          />
                        </div>
                      </v-col>
                    </v-row>

                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="period-calendar-wrap">
                    <v-layout class="calendar-top">
                      <v-subheader>{{ selectedMonth }}</v-subheader>

                      <v-layout class="buttons">
                        <v-btn depressed plain @click="$refs.calendar.prev()">
                          <v-icon size="40">mdi-arrow-left-thin</v-icon>
                        </v-btn>
                        <v-btn depressed plain @click="$refs.calendar.next()">
                          <v-icon size="40">mdi-arrow-right-thin</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-layout>

                    <v-calendar class="period-calendar" ref="calendar" locale="ru-RU"
                                :weekdays="[1,2,3,4,5,6,0]" :show-month-on-first="false"
                                :now="date"
                                :value="date"
                                event-name=""
                                type="month"
                                v-model="form.result"
                                :events="events"
                                :event-ripple="false"
                                @click:day="onClickDay"
                                :event-more="false"
                    >
                      <template v-slot:day-label="{ day, date }">
                        <v-layout :class="{'has-event': dayHasEvents(date)}">
                          <v-btn small :elevation="0">{{ day }}</v-btn>
                        </v-layout>
                      </template>
                      <template v-slot:event="{ event }">
                        <v-layout class="new-event-time" align-center justify-center>
                          <v-text-field type="time" :value="event.start | time"
                                        @change="(val) => changeEventTime(event, val, 'start')"
                                        dense hide-details
                          />
                          <span class="sep">-</span>
                          <v-text-field type="time" :value="event.end | time"
                                        @change="(val) => changeEventTime(event, val, 'end')"
                                        dense hide-details
                          />
                        </v-layout>
                      </template>
                    </v-calendar>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-btn class="btn" text @click="dialog = false">Отмена</v-btn>
                  <v-btn class="btn btn-dark" text @click="onSubmit">Создать</v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script>
export default {
  props: ['visible', 'date', 'event'],

  mounted() {
    this.calculateEvents();
  },

  computed: {
    dialog: {
      get () {
        this.form.date = this.date;
        return this.visible;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    },

    dateText() {
      if((this.form.end.type === 'date') && this.form.end.date)
        return this.$moment(this.form.end.date).format('D MMMM YYYY')
      else
        return '';
    },

    selectedMonth() {
      const str = this.$moment(this.form.result).format("MMMM YYYY");
      return str[0].toUpperCase() + str.slice(1);
    }
  },

  filters: {
    time(date){
      let minutes = date.getMinutes();
      let hours = date.getHours();
      minutes = minutes < 10 ? ('0' + minutes) : minutes;
      hours = hours < 10 ? ('0' + hours) : hours;
      return [hours, minutes].join(':');
    }
  },

  watch: {
    date () {
      this.calculateEvents();
    },

    'form.days' () {
      this.calculateEvents();
    },

    'form.end.type' () {
      this.calculateEvents();
    },

    'form.end.repeates' () {
      this.calculateEvents();
    },

    'form.end.date' () {
      this.calculateEvents();
    }
  },

  data() {
    return {
      form: {
        days: [],
        end: {
          type: 'repeates',
          date: null,
          repeates: 1
        }
      },
      events: [],
      data: {
        days: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        ends: [
          {type: 'date', name: "Дата"},
          {type: 'repeates', name: "Количество"}
        ]
      },
      showDatepicker: false
    }
  },

  methods: {
    onSubmit() {
      this.dialog = false;
      // this.form.days.sort((a,b) => a-b);
      this.$emit('save', this.events);
      this.events = [];
    },

    changeEventTime(event, val, prop) {
      this.events = this.events.map(e => {
        if(e.date === event.date) {
          e[prop] = new Date([event.date, val].join('T'));
        }
        return e;
      });
    },

    getParentsElement(parentClass, child) {
      let node = child.parentNode;
      while (node) {
        if (node.classList && node.classList.contains(parentClass)) return node;
        node = node.parentNode;
      }
      return false;
    },

    onClickDay(val, MouseEvent) {
      const isSetTime = this.getParentsElement('new-event-time', MouseEvent.target);

      if(!isSetTime) {
        const isPresentEventDay = Boolean(this.events.filter(e => e.date === val.date).length);
        if(isPresentEventDay) {
          this.deleteEvent(val.date)
        } else {
          this.createEvent(val.date);
        }
      }
    },

    deleteEvent(date) {
      const i = this.events.findIndex(e => e.date === date);
      this.events.splice(i, 1);
    },

    createEvent(date) {
      const is_event_present = this.events.length && (this.events.filter(e => e.start === date).length);
      if(is_event_present) return;

      const form = {...this.$store.state.calendar.form};

      const event = {
        date: date,
        start: new Date([date, form.time_from].join(' ')),
        end: new Date([date, form.time_to].join(' ')),
        timed: true
      }
      this.events.push(event);
    },

    calculateEvents() {
      const { end } = this.form;

      if(!end.date && !end.repeates) return false;

      this.events = [];

      if(end.type === 'date') {
        let days_between = this.$moment(this.date).diff(this.$moment(end.date), 'days');
        let past_days = days_between > 0;

        if(!past_days) {
          let days_between_with_current = Math.abs(days_between);

          while(days_between_with_current + 1) {
            let event_date = this.$moment(this.date).add(days_between_with_current, 'days').format('Y-MM-DD');
            if(this.isPresentInDays(event_date)) this.createEvent(event_date);

            days_between_with_current--;
          }
        }
      }

      if(end.type === 'repeates') {
        let repeates = end.repeates;
        let event_date = this.date;
        let is_start_date = true;

        while(repeates > 0) {
          if(is_start_date) {
            event_date = this.$moment(event_date).format('Y-MM-DD');
            is_start_date = false;
          } else {
            event_date = this.$moment(event_date).add( 1, 'days').format('Y-MM-DD');
          }
          if(this.isPresentInDays(event_date)) {
            this.createEvent(event_date);
            repeates--;
          }
        }
      }
    },

    isPresentInDays(date) {
      const days = this.form.days;
      if(!days.length) return true;

      let day_date = this.$moment(date).day();
      day_date = day_date > 0 ? (day_date - 1) : 6;
      return days.includes(day_date);
    },

    dayHasEvents(date) {
      return this.events.find(event => event.date === date);
    }
  }
}
</script>

<style lang="scss">

.period-calendar-wrap {
  display: flex;
  flex-direction: column;

  .calendar-top {
    margin-bottom: 10px;
    flex: none;
    align-items: center;
    justify-content: space-between;

    .buttons {
      display: inline-flex;
      flex: inherit;
    }
  }
}

.repeats-number {
  margin-top: 3px;
}

.v-item-group {
  .v-chip {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    padding: 0;
    margin-bottom: 3px;
    justify-content: center;

    &:not(:last-of-type) {
      margin-right: 8px;
    }

    &:not(.v-chip--active) {
      background: $bg-lt;
    }

    &.v-chip--active {
      background: $color;

      .v-chip__content {
        color: #fff;
      }
    }
  }
  .v-chip__content {
    font-size: 14px;
    font-family: $ff-bold;
    text-transform: uppercase;
  }
}

.period-calendar {
  &.theme--light.v-calendar-weekly,
  &.theme--light.v-calendar-weekly .v-calendar-weekly__day {
    border-color: #cdc9e4;
  }

  .form-row-ends {
    .form-field-date-text:not(:last-of-type) {
      margin-bottom: 5px;
    }
  }

  .v-event {
    .new-event-day {
      width: 33px;
      color: #fff;
      padding-top: 5px;
      text-align: center;
    }

    .sep {
      font-size: 10px;
      color: #fff;
      cursor: default;
    }

    .new-event-time {
      opacity: .8;

      .v-input {
        margin-top: 0;
      }

      input[type="time"] {
        @extend %time;
        color: #fff;
        text-align: center;
        font-size: 11px;
      }
    }
  }

  .v-calendar-weekly__day {
    height: 60px;
  }

  .v-calendar-weekly__day-label {
    height: 100%;
    margin-top: 0;

    .layout {
      height: 100%;
    }

    .v-btn {
      width: 100%;
      height: 100%;
      background: none;
      pointer-events: none;
      border-radius: 0;
      position: relative;

      &::before {
        display: none;
      }

      .v-btn__content {
        font-family: $ff;
        color: $color;
        position: absolute;
        top: 5px;
        left: 5px;
      }
    }
  }

  .v-event {
    background: none !important;
    position: absolute;
    left: 2px;
    bottom: 0;
  }

  .has-event {
    background: $color !important;

    .v-btn__content {
      color: #fff !important;
    }
  }
}
</style>

