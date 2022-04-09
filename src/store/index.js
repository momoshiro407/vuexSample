import { createStore } from 'vuex'
import { solveEquation } from './modules/solveEquation'
import { timer } from './modules/timer'

export default createStore({
  modules: {
    solveEquation,
    timer
  }
})
