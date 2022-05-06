export const solveEquation = {
  namespaced: true,
  state: {
    solutions: [], // 解の計算結果
    isSolvable: true, // 解を持つかどうかのフラグ
  },
  mutations: {
    setSolutions (state, solutions) {
      state.solutions = solutions
    },
    checkSolvable (state) {
      // 解の配列が空でなければ実数解を持つと判定
      state.isSolvable = state.solutions.length > 0
    }
  },
  actions: {
    setResult (context, solutions) {
      context.commit('setSolutions', solutions)
      context.commit('checkSolvable')
    }
  }
};