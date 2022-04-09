<template>
  <h2>カウントダウンタイマー</h2>
  <div class="container">
    <Display />
    <Buttons />
  </div>
</template>

<script>
import Display from './Display.vue'
import Buttons from './Buttons.vue'

export default {
  components: {
    Display,
    Buttons
  }
}
</script>
