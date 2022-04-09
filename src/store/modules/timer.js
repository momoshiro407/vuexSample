export const timer = {
  namespaced: true,
  state: {
    time: 0, // 残り時間(ms)
    isInit: true, // 初期状態かどうかのフラグ
    isRunning: false // カウント実行中かどうかのフラグ
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
      if (context.state.time > 0) {
        context.commit('decrement', delta)
      }
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

