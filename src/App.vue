<template>
  <SolveEquationContainer />
</template>

<script>
import SolveEquationContainer from './components/solveEquation/SolveEquationContainer.vue'

export default {
  name: 'App',
  components: {
    SolveEquationContainer
  }
}
</script>

<style>
  h2 {
    border-left: 5px solid #c7c7c7;
    border-bottom: 2px solid #c7c7c7;
    color: #5a5a5a;
    background: #ffffff;
    padding-left: 10px;
  }
  .container {
    padding-left: 10px;
  }
  input, button {
    line-height: 20px;
  }
</style>
