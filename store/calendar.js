export const state = () => ({
  form: {},
  events: [
    {id: 10,
    auditorium : 1,
    date : "2023-01-20",
    description : "тест 1",
    end : new Date(2023, 0, 20, 0, 0, 0, 0),
    name : "первое мероприятие",
    organizer : 1,
    start : new Date(2023, 0, 20, 0, 0, 0, 0),
    target : 1,
    timed : true,
    type : 1,},

    {id: 10,
    auditorium : 1,
    date : "2023-01-20",
    description : "тест 1",
    end : new Date(2023, 0, 27, 0, 0, 0, 0),
    name : "первое мероприятие",
    organizer : 1,
    start : new Date(2023, 0, 27, 0, 0, 0, 0),
    target : 1,
    timed : true,
    type : 1,},

    {id: 10,
    auditorium : 1,
    date : "2023-01-20",
    description : "тест 1",
    end : new Date(2023, 0, 27, 0, 0, 0, 0),
    name : "первое мероприятие",
    organizer : 1,
    start : new Date(2023, 1, 3, 0, 0, 0, 0),
    target : 1,
    timed : true,
    type : 1,},
  ],
  selectedEvent: null,
})

export const mutations = {
  addEvent(state, event) {
    state.events.push(event);
  },
  setEvents(state, events) {
    state.events = events;
  },
  resetForm(state) {
    state.form = {};
  },
  addForm(state, data) {
    state.form = data;
  },
  updateFormField(state, {field, val}) {
    state.form[field] = val;
  },
}
