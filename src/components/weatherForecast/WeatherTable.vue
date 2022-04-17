<template>
  <div>
    <button @click="onClick" :disabled="isLoading">天気情報を取得</button>
  </div>
  <h3>{{ title }}</h3>
  <div class="info-area" v-if="forecasts.length > 0 && !isLoading">
    <div class="info-container" v-for="(forecast, index) in forecasts" :key="index">
      <p><span>{{ displayDate(forecast.date) }}</span><span>{{ forecast.dateLabel }}</span></p>
      <img :src="forecast.image.url">
      <ul>
        <li class="max-temperature">最高：{{ forecast.temperature.max.celsius }}℃</li>
        <li class="min-temperature">最低：{{ forecast.temperature.min.celsius }}℃</li>
      </ul>
      <table border="1">
        <tr>
          <td>時</td>
          <td>0~6</td>
          <td>6~12</td>
          <td>12~18</td>
          <td>18~24</td>
        </tr>
        <tr>
          <td>降水</td>
          <td>{{ forecast.chanceOfRain.T00_06 }}</td>
          <td>{{ forecast.chanceOfRain.T06_12 }}</td>
          <td>{{ forecast.chanceOfRain.T12_18 }}</td>
          <td>{{ forecast.chanceOfRain.T18_24 }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="loading" v-else>
    <img src="@/assets/pic/loading.gif" width="50" height="50">
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const $store = useStore()
    const title = ref('')
    const forecasts = ref([]) // 取得した天気情報
    const isLoading = computed(() => $store.state.weather.isLoading)

    const onClick = () => {
      $store.dispatch('weather/getWeatherInfo')
        .then(result => {
          title.value = result.title
          forecasts.value = result.forecasts
        })
        .catch(err => console.log(err))
    }

    // XX月XX日(X)形式に変換
    const displayDate = (dateString) => {
      const d = new Date(dateString)
      const week = ['日', '月', '火', '水', '木', '金', '土']
      const month = d.getMonth() + 1
      const date = d.getDate()
      const day = week[d.getDay()]
      return `${month}月${date}日(${day})`
    }

    onMounted(() => {
      $store.dispatch('weather/getWeatherInfo')
        .then(result => {
          title.value = result.title
          forecasts.value = result.forecasts
        })
        .catch(err => console.log(err))
    })

    return { title, forecasts, isLoading, onClick, displayDate }
  }

}
</script>

<style scoped>
  .info-area {
    display:flex;
  }
  .info-container {
    border: 1px solid #c9c9c9;
    border-radius: 4px;
    margin: 0 5px;
    padding: 10px;
    width: 280px;
    box-sizing:border-box
  }
  p {
    font-weight: bold;
    margin: 5px 0;
  }
  span {
    margin-right: 20px;
  }
  ul {
    list-style: none;
    float: right;
    width: 100px;
    margin: 0;
    padding: 5px 0;
  }
  .max-temperature {
    font-weight: bold;
    color: #ff0000;
  }
  .min-temperature {
    font-weight: bold;
    color: #0000ff;
  }
  table {
    border-collapse: collapse;
    margin: 0 auto;
  }
  td {
    width: 55px;
    text-align: center;
  }
  .loading {
    text-align: center;
  }
</style>