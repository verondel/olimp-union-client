export const state = () => ({
  evens: []
})
export const getters = {
  getEvens: state => state.evens
}

export const mutations = {
  ADD_DATA (state, data) {
    state.evens = data
  }
}

export const actions = {
  async loadData ({ commit }) {
    console.log('mutation')
    const tmStart = '2021-09-03'
    const tmEnd = '2021-09-21'
    const restApi = 'http://localhost:5000/api/shedule/activity/' + tmStart + '/' + tmEnd
    await this.$axios.get(restApi).then(function (response) {
      console.log(response.data.items)
      const data = []
      response.data.items.forEach((element) => {
        console.log(element)
        const msg = `${element.timeEnd}${element.name}`

        const obj = {
          content: msg,
          data: new Date(),
          name: element.name,
          id_classroom: element.id_classroom,
          timeStart: element.tm_end,
          timeEnd: element.tm_start
        }
        data.push(obj)
      })
      commit('ADD_DATA', data)
    })
  }
}
