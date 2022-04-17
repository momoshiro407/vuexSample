<template>
  <div class="selector">
    <label>都道府県：</label>
    <select name="prefecture" v-model="selectedPrefId" @change="onChangePref" :disabled="isLoading">
      <option v-for="pref in prefectures" :key="pref" :value="pref.id">{{ pref.name }}</option>
    </select>
    <label>地域：</label>
    <select name="city" v-model="selectedCityId" @change="onChangeCity" :disabled="isLoading">
      <option v-for="city in cities" :key="city" :value="city.id">{{ city.name }}</option>
    </select>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'
import cityIdDataJson from '@/assets/json/city_id_data.json'

export default {
  setup() {
    const $store = useStore()
    const cityIdData = JSON.parse(JSON.stringify(cityIdDataJson)) // 都道府県毎のcityIDの情報
    const selectedPrefId = ref('') // 選択中の都道府県
    const prefectures = ref([]) // 都道府県プルダウンの中身
    const cities = ref([]) // 地域プルダウンの中身

    const selectedCityId = computed(() => $store.state.weather.cityId) // 選択中の地域
    const isLoading = computed(() => $store.state.weather.isLoading) // 情報取得中のフラグ

    const onChangePref = () => {
      // 都道府県の選択値に応じて都市プルダウンの中身を切り替える
      cities.value = cityIdData.prefectures.find(pref => pref.id === selectedPrefId.value).cities
      $store.dispatch('weather/updateCityId', cities.value[0].id)
    }

    const onChangeCity = (e) => {
      $store.dispatch('weather/updateCityId', e.target.value)
    }

    onMounted(() => {
      prefectures.value = cityIdData.prefectures.map(pref => {
        return { name: pref.name, id: pref.id }
      })
      selectedPrefId.value = prefectures.value[0].id
      cities.value = cityIdData.prefectures.find(pref => pref.id === selectedPrefId.value).cities
      $store.dispatch('weather/updateCityId', cityIdData.prefectures[0].cities[0].id)
    })

    return { prefectures, cities, selectedPrefId, selectedCityId, isLoading, onChangePref, onChangeCity }
  }
}
</script>

<style scoped>
  .selector {
    margin: 20px 0;
  }
  select {
    width: 100px;
    height: 25px;
    margin-right: 20px;
  }
</style>