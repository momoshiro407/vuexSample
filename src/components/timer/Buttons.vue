<template>
  <div class="buttons">
    <div class="buttons-row">
      <div class="set-buttons">
        <span>時：</span>
        <button :disabled="!isInit" @click="increment(3600)">+</button>
        <button :disabled="!isInit" @click="decrement(3600)">-</button>
      </div>
      <div class="set-buttons">
        <span>分：</span>
        <button :disabled="!isInit" @click="increment(60)">+</button>
        <button :disabled="!isInit" @click="decrement(60)">-</button>
      </div>
      <div class="set-buttons">
        <span>秒：</span>
        <button :disabled="!isInit" @click="increment(1)">+</button>
        <button :disabled="!isInit" @click="decrement(1)">-</button>
      </div>
    </div>
    <div class="buttons-row">
      <button v-if="isInit" @mousedown="startAndStop">スタート</button>
      <button v-if="!isInit" @mousedown="startAndStop">ストップ/再開</button>
      <button :disabled="isRunning" @mousedown="reset">リセット</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const $store = useStore()
    const isInit = computed(() => $store.state.timer.isInit)
    const isRunning = computed(() => $store.state.timer.isRunning)
    const timerId = computed(() => $store.state.timer.timerId)

    // タイマーの設定時間を増やす
    const increment = (delta) => $store.dispatch('timer/incrementAct', delta)
    // タイマーの設定時間を増やす
    const decrement = (delta) => $store.dispatch('timer/decrementAct', delta)
    // 計測開始(再開)・停止
    const startAndStop = () => {
      if (isRunning.value) {
        clearInterval(timerId.value)
      } else {
        // 正確な計測方法ではないが、1/100秒(10ms)毎に呼び出すことで多少精度を上げている
        const id = setInterval(() => decrement(0.01), 10)
        $store.dispatch('timer/setTimerIdAct', id)
      }
      $store.dispatch('timer/startAndStopAct')
    }
    // タイマーを初期状に戻す
    const reset = () => {
      $store.dispatch('timer/resetAct')
      clearInterval(timerId.value)
    }

    return { isInit, isRunning, increment, decrement, startAndStop, reset }
  }
}
</script>

<style scoped>
  .buttons-row {
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
  .set-buttons {
    margin: 10px;
  }
  button {
    margin: 0 5px;
  }
</style>