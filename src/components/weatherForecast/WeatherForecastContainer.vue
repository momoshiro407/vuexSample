<template>
  <h2>天気予報</h2>
  <div class="container">
    <AreaSelect />
    <WeatherTable />
  </div>
</template>

<script>
import AreaSelect from './AreaSelect.vue'
import WeatherTable from './WeatherTable.vue'

export default {
  components: {
    AreaSelect,
    WeatherTable
  }

}
</script>

<style scoped>
  .container {
    width: 1000px;
  }
</style>