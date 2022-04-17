import { createStore } from 'vuex'
import { solveEquation } from './modules/solveEquation'
import { timer } from './modules/timer'
import { weather } from './modules/weather'

export default createStore({
  modules: {
    solveEquation,
    timer,
    weather
  }
})
