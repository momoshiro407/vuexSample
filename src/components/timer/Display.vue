<template>
  <div>
    <div class="timer-display">
      {{ time }}
    </div>    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const $store = useStore()

    const time = computed(() => $store.getters['timer/getDisplayTime'])

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