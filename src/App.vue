<template>
  <SolveEquationContainer />
  <TimerContainer />
</template>

<script>
import SolveEquationContainer from './components/solveEquation/SolveEquationContainer.vue'
import TimerContainer from './components/timer/TimerContainer.vue'

export default {
  name: 'App',
  components: {
    SolveEquationContainer,
    TimerContainer
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
    width: 400px;
  }
  input, button {
    line-height: 20px;
  }
</style>
