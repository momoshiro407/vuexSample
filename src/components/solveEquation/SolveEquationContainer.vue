<template>
  <h2>二次方程式を解く</h2>
  <div class="container">
    <Input />
    <Result />
  </div>
</template>

<script>
import Input from './Input.vue'
import Result from './Result.vue'

export default {
  components: {
    Input,
    Result
  }
}
</script>

<style scoped>
  .container {
    width: 600px;
  }
</style>
