import axios from 'axios'

export const weather = {
  namespaced: true,
  state: {
    cityId: '', // 地域ID
    isLoading: true // 情報取得中フラグ
  },
  mutations: {
    setCityId (state, id) {
      state.cityId = id
    },
    setLoadingFlag (state, flag) {
      state.isLoading = flag
    }
  },
  actions: {
    updateCityId (context, id) {
      context.commit('setCityId', id)
    },
    getWeatherInfo (context) {
      context.commit('setLoadingFlag', true)
      return new Promise((resolve, reject) => {
        axios.get(`https://weather.tsukumijima.net/api/forecast/city/${context.state.cityId}`)
          .then(result => {
            context.commit('setLoadingFlag', false)
            resolve(result.data)
          })
          .catch(err => {
            context.commit('setLoadingFlag', false)
            reject(err)
          })
      })
    }
  }
}