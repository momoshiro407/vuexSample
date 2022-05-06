<template>
  <div>
    <div class="timer-display">
      {{ time }}
    </div>    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const $store = useStore()
    const time = computed(() => $store.getters['timer/getDisplayTime'])
    const isInit = computed(() => $store.state.timer.isInit)
    const timerId = computed(() => $store.state.timer.timerId)

    // ストアのtimeを監視し0秒になったらタイマーを停止、メッセージを表示する
    const unsubscribe = $store.subscribe((mutation, state) => {
      if (mutation.type === 'timer/decrement') {
        if (!isInit.value && state.timer.time === 0) {
          // timeが0になった瞬間に停止すると表示時間との間に若干差(1/100秒ぐらい表示が残ったまま)がでてしまうので
          // timeが0になってからタイマー停止まで少し遅らせている
          setTimeout(() => {
            clearInterval(timerId.value)
            $store.dispatch('timer/resetAct')
            alert('時間です')
          }, 100)
        }
      }
    })
    // コンポーネントインスタンスのunmount直前でストアの監視を停止
    onBeforeUnmount(() => {
      unsubscribe()
    })

    return { time }
  }
}
</script>

<style>
  .timer-display {
    text-align: center;
    background: #000000;
    color: aliceblue;
    font-size: 35px;
  }
</style>