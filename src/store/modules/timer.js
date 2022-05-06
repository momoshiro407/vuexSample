export const timer = {
  namespaced: true,
  state: {
    time: 0, // 残り時間(ms)
    isInit: true, // 初期状態かどうかのフラグ
    isRunning: false, // タイマーが起動中かどうかのフラグ
    timerId: null // インターバルID
  },
  getters: {
    // 残り時間を00:00:00.00にフォーマット
    getDisplayTime (state) {
      return new Date(state.time).toISOString().slice(11, 22)
    }
  },
  mutations: {
    increment (state, delta) {
      state.time += delta * 1000 // msに変換
    },
    decrement (state, delta) {
      state.time -= delta * 1000 // msに変換
    },
    updateIsInit (state) {
      state.isInit = false
    },
    setTimerId (state, timerId) {
      state.timerId = timerId
    },
    startAndStop (state) {
      state.isRunning = !state.isRunning
    },
    reset (state) {
      state.time = 0,
      state.isInit = true,
      state.isRunning = false
    }
  },
  actions: {
    incrementAct (context, delta) {
      context.commit('increment', delta)
    },
    decrementAct (context, delta) {
      // 現在のtimeがdelta以上の時だけ減算を行いtimeが負になるのを防ぐ
      if (context.state.time / 1000 >= delta) {
        context.commit('decrement', delta)
      }
    },
    setTimerIdAct (context, timerId) {
      context.commit('setTimerId', timerId)
    },
    startAndStopAct (context) {
      if (context.state.isInit) {
        context.commit('updateIsInit')
      }
      context.commit('startAndStop')
    },
    resetAct (context) {
      context.commit('reset')
    }
  }
};

