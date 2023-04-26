<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card class="modal event-edit">
        <v-container fluid class="modal-inner">

          <v-layout class="modal-header">
            <v-flex grow>
              <v-layout align-center>
                <v-avatar class="orginizer-avatar" size="36">
                  <img :src="orginizer.avatar" alt="John">
                </v-avatar>
                <div class="orginizer-name font-als-b" v-html="orginizerName"></div>
              </v-layout>
            </v-flex>

            <v-flex class="header-buttons" shrink>
              <v-icon @click="openSettings">mdi-dots-vertical</v-icon>
              <v-icon @click="dialog = false">mdi-window-close</v-icon>
            </v-flex>
          </v-layout>

          <v-layout column>
            <p class="event-time font-als-b">{{ event.time_from }} — {{ event.time_to }}</p>
            <p class="event-title font-als-b">{{ event.name }}</p>
            <p class="event-auditorium font-als-b">ауд. {{ aud.name }} — {{ aud.type }}<br>{{ aud.address }}</p>
          </v-layout>

          <v-layout class="user-presence" column>
            <v-flex class="presence-labels">
              <div :class="['label-item', {active: item.status}]" v-for="(item, key) in presenceStatuses" :key="key" @click="setPresenceStatus(key+1)">
                <div class="label-icon" v-html="item.icon"></div>
                <div class="label-caption" v-if="item.status">{{ item.text }}</div>
              </div>
            </v-flex>
            <v-slider v-model="userPresence" min="1" max="3" step="1"
              track-color="#351BA9" track-fill-color="#351BA9" thumb-color="#351BA9" ticks="always" tick-size="6"
            />
          </v-layout>
          <chat />
          <v-layout>
            <v-flex text-center>
              <v-btn v-if="isGuest" class="send-request-btn" color="#D9D9FF" depressed @click="sendRequest">Подать заявку на участие</v-btn>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import calendarModels from '@/models/calendar';
export default {
  name: "Event-edit",

  props: ['visible', 'event'],

  created() {
    this.presenceStatuses = calendarModels.presenceStatuses;
  },

  computed: {
    dialog: {
      get () {
        return this.visible;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    },

    orginizer() {
      const _this = this;
      return calendarModels.organizers.find(person => (person.id === _this.event.organizer));
    },

    orginizerName() {
      return this.orginizer.name.trim().replace(' ', '<br>');
    },

    aud() {
      const _this = this;
      return calendarModels.auditoriums.find(aud => aud.id === _this.event.auditorium);
    },

    isGuest() {
      return this.userLevel === 0;
    },

    isStudent() {
      return this.userLevel === 1;
    },

    isOrganizer() {
      return this.userLevel === 2;
    },
  },

  watch: {
    userPresence: function (val) {
      this.setPresenceStatus(val);
    }
  },

  data(){
    return {
      userLevel: 0,
      presenceStatuses: [],
      userPresence: null,
    }
  },

  methods: {
    openSettings() {
      alert('Настройки открыты');
    },

    setPresenceStatus(key) {
      this.presenceStatuses.map(item => item.status = false);
      this.presenceStatuses[key-1].status = true;
      this.userPresence = key;
    },

    sendRequest() {
      alert("Заявка на участие подана");
    }
  }
}
</script>

<style lang="scss">
.modal-header {
  margin-bottom: 24px;
}

.orginizer-avatar {
  border: 1px solid $color;
  padding: 1px;
  margin-right: 10px;
}

.orginizer-name {
  line-height: 1.2;
  color: $color;
}

.event-time {
  margin-bottom: 5px;
}

.event-title {
  font-size: 24px;
  line-height: 28px;
}

.right-col {
  flex: none;
  width: 40px;
  height: 40px !important;
  min-width: auto !important;
  margin-left: 8px;
}

.border-lt {
  &,
  fieldset {
    border-color: $color-border-lt;
  }
}

.layout.column {
  color: $color;
}

.presence-labels {
  display: flex;
  max-width: inherit !important;
  justify-content: space-between;
  margin: 0 -7px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 20px;

  .label-item {
    position: relative !important;

    svg {
      width: 30px;
      height: 30px;
    }

    .label-caption {
      font-family: $ff;
      white-space: nowrap;
      padding: 5px 10px;
      color: #000;
      border: 1px solid #C4B9E7;
      border-radius: 20px;
      position: absolute;
      top: -50px;
      left: -10px;

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        display: inline-block;
        border: 1px solid #C4B9E7;
        border-top: none;
        border-left: none;
        background: #fff;
        transform: rotate(45deg);
        position: absolute;
        bottom: -6px;
        left: 20px;
      }
    }

    &:not(:first-of-type) {
      .label-caption {
        left: 50%;
        transform: translateX(-50%);

        &::before {
          left: calc(50% - 5px);
          transform: rotate(45deg);
        }
      }
    }

    &:last-of-type {
      .label-caption {
        left: auto;
        right: -10px;
        transform: none;

        &::before {
          left: auto;
          right: 20px;
        }
      }
    }

    &:not(.active) {
      cursor: pointer;

      svg {

        .svg-border {
          stroke: #AFAFAF;
        }

        circle:not(.svg-border) {
          fill: #AFAFAF;
        }

        path:not(.nofill) {
          fill: #AFAFAF;
        }
      }
    }
  }
}

.user-presence {
  margin: 50px 18px 0;

  .v-slider__thumb {
    border-radius: 50%;
    z-index: 2;

    &::before {
      display: none;
    }

    &::after {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid #fff;
      outline: 1px solid $color;
    }
  }

  .v-slider__tick {
    border-radius: 50%;
    background: #fff;
    border: 1px solid $color;
    cursor: pointer;
  }
}

.send-request-btn {
  width: 190px;
  height: 46px !important;
  white-space: normal !important;
  text-transform: lowercase;
  margin-top: 15px;

  .v-btn__content {
    width: 100%;
    font-family: $ff-bold;
    color: $color;
  }
}

.header-buttons .v-icon {
  color: $color;
}
</style>
