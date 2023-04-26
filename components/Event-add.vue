<template>
  <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="620px">

        <v-card class="modal">
          <div class="modal-inner">
            <v-card-title>
              <span class="modal-title font-als-b font-lg">Новое мероприятие</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form">

                  <v-row class="form-row">
                    <v-col cols="12">
                      <v-subheader>Название</v-subheader>
                      <v-text-field :value="form.name" @input="(val) => updateField(val, 'name')"
                                    placeholder="Placeholder" class="form-field bg-dark"
                                    dense outlined hide-details persistent-placeholder
                      />
                    </v-col>
                  </v-row>

                  <v-row class="form-row form-row-date">
                    <v-col cols="12" sm="7">
                      <v-layout>
                        <v-icon>mdi-calendar-month-outline</v-icon>
                        <p class="date-label">Дата</p>
                        <p class="date-value first-uppercase">{{ $moment(date).format('dddd, D MMMM') }}</p>
                      </v-layout>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-layout>
                        <v-icon>mdi-clock-time-five-outline</v-icon>
                        <p class="date-label">Время</p>
                        <v-layout class="date-value">
                          <v-text-field type="time" :value="form.time_from" @input="(val) => updateField(val, 'time_from')"
                                        dense hide-details
                          />
                          <span> — </span>
                          <v-text-field type="time" :value="form.time_to" @input="(val) => updateField(val, 'time_to')"
                                        dense hide-details
                          />
                        </v-layout>
                      </v-layout>
                    </v-col>
                  </v-row>

                  <v-row class="form-row">
                    <v-col cols="12" sm="8">
                      <v-subheader>Местоположение</v-subheader>
                      <v-select :value="form.target" required @change="(val) => updateField(val, 'target')"
                                class="form-field" placeholder="Выберите площадку"
                                append-icon="mdi-chevron-down"
                                dense outlined hide-details persistent-placeholder
                                :items="data.targets" item-text="name" item-value="id"
                      />
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-subheader>Аудитория</v-subheader>
                      <v-select :value="form.auditorium" @change="(val) => updateField(val, 'auditorium')"
                                class="form-field" placeholder=""
                                append-icon="mdi-chevron-down"
                                dense outlined hide-details persistent-placeholder
                                :items="data.auditoriums" item-text="name" item-value="id"
                      />
                    </v-col>
                  </v-row>

                  <v-row class="form-row">
                    <v-col cols="12" sm="6">
                      <v-subheader>Тип мероприятия</v-subheader>
                      <v-select :value="form.type" @change="(val) => updateField(val, 'type')"
                                class="form-field" placeholder=""
                                append-icon="mdi-chevron-down"
                                dense outlined hide-details persistent-placeholder
                                :items="data.types" item-text="name" item-value="id"
                      />
                    </v-col>

                    <v-col cols="12" sm="6" @click="setRepeates">
                      <v-subheader>Регулярность</v-subheader>
                      <v-select :value="form.regularity" @change="(val) => updateField(val, 'regularity')"
                                class="form-field" placeholder="Повторяется"
                                append-icon="mdi-chevron-down"
                                dense readonly outlined hide-details persistent-placeholder
                                :items="[]"
                      />
                    </v-col>
                  </v-row>

                  <v-row class="form-row">
                    <v-col cols="12">
                      <v-subheader>Описание мероприятия</v-subheader>
                      <v-textarea :value="form.description" @change="(val) => updateField(val, 'description')"
                                  auto-grow rows="3"
                                  class="form-field bg-dark" placeholder="Placeholder"
                                  dense outlined hide-details persistent-placeholder
                      />
                    </v-col>
                  </v-row>

                  <v-row class="form-row">
                    <v-col cols="12">
                      <v-subheader>Организатор</v-subheader>
                      <v-select :value="form.organizer" @change="(val) => updateField(val, 'organizer')"
                                class="form-field" placeholder="Выберите организатора"
                                append-icon="mdi-chevron-down"
                                dense outlined hide-details persistent-placeholder
                                :items="data.organizers" item-text="name" item-value="id"
                      />
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
    </v-row>
</template>


<script>
import models from '@/models/calendar';
export default {
  props: ['visible', 'date', 'repeats', 'clear'],

  created() {
    this.data = models;
  },

  computed: {
    dialog: {
      get () {
        let formClear = this.clear;

        if(formClear) {
          this.form = this.template;
          this.$store.commit('calendar/resetForm');
        } else {
          this.form = this.$store.state.calendar.form;
        }
        return this.visible;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  },

  data() {
    return {
      template: {
        id: null,
        name: '',
        time_from: '00:00',
        time_to: '00:00',
        target: null,
        auditorium: null,
        type: null,
        regularity: null,
        description: '',
        organizer: null
      },
      data: {},
      form: {}
    }
  },

  methods: {
    onSubmit() {
      this.dialog = false;
      const form = this.$store.state.calendar.form;

      if(this.repeats.length) {
        this.repeats.map(event => {
          this.$store.commit('calendar/addEvent', {...event, ...form});
        });
      } else {
        let date = this.date;

        const event = {
          start: new Date([date, form.time_from].join(' ')),
          end: new Date([date, form.time_to].join(' ')),
          timed: true
        }
        this.$store.commit('calendar/addEvent', {...event, ...form});
      }
      this.$emit('save');
    },

    updateField (val, field) {
      this.$store.commit('calendar/updateFormField', {field, val});
    },

    setRepeates() {
      this.dialog = false;
      // this.$store.commit('calendar/addForm', this.form);
      this.$emit('repeate');
    }
  }
}
</script>

<style lang="scss">

.modal {
  padding: 14px;
}

.modal-inner {
  background: #fff;
  border: 1px solid $color;
}

.v-card__title {
  justify-content: center;
  color: $color;
}

.v-form {
  .v-card__actions {
    justify-content: center;
  }

    .btn {
      margin: 10px 20px !important;
      padding: 10px 20px !important;
      border: 1px solid $color !important;
    }

    .btn-dark {
      background-color: $color;
    }

    .btn:hover {
      background-color: inherit;
    }
  
  .v-subheader {
    padding: 0px;
    font-weight: 500 !important;
  }
  
  .v-icon::before {
    color: $color;
  }

  .form-row-date {

    input[type="time"] {
      @extend %time;
    }

    .v-icon {
      margin: -2px 10px 0 0;
    }

    .date-value,
    .date-label {
      margin-bottom: 0;
      color: $color;
    }

    .date-label {
      margin-right: 14px;
      font-weight: 500;
    }

    .v-input {
      width: 44px;
      margin: 0;
      flex: none;

      .v-input__slot,
      .v-text-field__slot {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    .dayweek {
      display: inline-block;
      max-width: 70px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
