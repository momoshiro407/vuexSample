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
import { computed, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const $store = useStore()
    let timerId = null

    const isInit = computed(() => $store.state.timer.isInit)
    const isRunning = computed(() => $store.state.timer.isRunning)

    // タイマーの設定時間を増やす
    const increment = (delta) => $store.dispatch('timer/incrementAct', delta)
    // タイマーの設定時間を増やす
    const decrement = (delta) => $store.dispatch('timer/decrementAct', delta)
    // 計測開始
    const startAndStop = () => {
      if (isRunning.value) {
        clearInterval(timerId)
      } else {
        // 正確な計測方法ではないが、1/100秒(10ms)毎に呼び出すことで多少精度を上げている
        timerId = setInterval(() => decrement(0.01), 10)
      }
      $store.dispatch('timer/startAndStopAct')
    }
    const reset = () => {
      $store.dispatch('timer/resetAct')
      clearInterval(timerId)
    }

    // ストアのtimeを監視し0秒になったらタイマーを停止、メッセージを表示する
    const unsubscribe = $store.subscribe((mutation, state) => {
      if (mutation.type === 'timer/decrement') {
        if (state.timer.time === 0) {
          setTimeout(() => {
            clearInterval(timerId)
            reset()
            alert('時間です')
          }, 100)
        }
      }
    })
    // コンポーネントインスタンスのunmount直前でストアの監視を停止
    onBeforeUnmount(() => {
      unsubscribe()
    })

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