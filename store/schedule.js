// глобальное состояние приложения.
export const state = () => ({
  address: ['a']
})
export const getters = {
  getAddress: state => state.address
}


// изменение  состояния через мутации
export const mutations = {
  ADD_DATA (state, data) {
    state.address = data
  }
}


// actions функции,которые не меняют напрямую состояние, но зато получают в качестве первого аргумента объект store
// из которого в данном случае нам нужна функция comit, которая получает в качестве первого аргумента имя мутации,
// а второго данные, которые она передаёт в мутацию. А в качестве второго аргумента action получает контекст Nuxt (this)
// где мы можем обращаться к разным плагинам, например к тому же axios и работать через него с реальным API.
// По сути в actions будет проходить вся работа с API. Мы можем также вызывать другие actions, таким образом создавая цепочки.
// В данном случае мы симулируем работу с API, но в будущем можем заменить её на реальный API при этом на не придется
// переписывать код компонентов и страниц так как вся логика работы скрыта.


export const actions = {
  async loadData ({ commit }) {
    console.log('actions')
    const restApi = '/schedule/campus/'
    await this.$axios.get(restApi).then(function (response) {
        console.log("Проверка переменных  внутри");
         console.log(response.data.result)
         const data = []
         response.data.result.forEach((element) => {
           const obj = {
                 name: element.name,
                 id: element._id
               }
          data.push(obj)
         })
         // this.arrLocation = data
           commit('ADD_DATA', data)
       })

    // const tmStart = '2021-09-03'
    // const tmEnd = '2021-09-21'
    // const restApi = 'http://localhost:5000/api/shedule/activity/' + tmStart + '/' + tmEnd
    // await this.$axios.get(restApi).then(function (response) {
    //   console.log(response.data.items)
    //   const data = []
    //   response.data.items.forEach((element) => {
    //     console.log(element)
    //     const msg = `${element.timeEnd}${element.name}`
    //
    //     const obj = {
    //       content: msg,
    //       data: new Date(),
    //       name: element.name,
    //       id_classroom: element.id_classroom,
    //       timeStart: element.tm_end,
    //       timeEnd: element.tm_start
    //     }
    //     data.push(obj)
    //   })
    //   commit('ADD_DATA', data)
    // })
  }
}
