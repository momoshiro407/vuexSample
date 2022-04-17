<template>
  <SolveEquationContainer />
  <TimerContainer />
  <WeatherForecastContainer />
</template>

<script>
import SolveEquationContainer from './components/solveEquation/SolveEquationContainer.vue'
import TimerContainer from './components/timer/TimerContainer.vue'
import WeatherForecastContainer from './components/weatherForecast/WeatherForecastContainer.vue'

export default {
  name: 'App',
  components: {
    SolveEquationContainer,
    TimerContainer,
    WeatherForecastContainer
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
  h2:not(:first-child) {
    margin-top: 50px;
  }
  .container {
    padding-left: 10px;
  }
  input, button {
    line-height: 20px;
  }
</style>
