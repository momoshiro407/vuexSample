<template>
  <div>
    <p>二次方程式の係数を入力してください。</p>
    <div>
      <input v-model="a">X<sup>2</sup> + <input v-model="b">X + <input v-model="c"> = 0
      <button @click="calc">計算</button>
      <span v-if="error" class="error">{{ error }}</span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const $store = useStore()
    const a = ref()
    const b = ref()
    const c = ref()
    const error = ref('')

    const calc = () => {
      error.value = ''
      if (!a.value || !b.value || !c.value) {
        error.value = '未入力の係数があります！'
        return
      }
      if (a.value == 0) {
        error.value = '2次の係数に0は指定できません！'
        return
      }

      const solutions = [] // 方程式の解の配列
      const dis = b.value ** 2 - 4 * a.value * c.value // 判別式

      // 解の公式を用いて実数解を求める
      if (dis > 0) {
        solutions.push((-1 * b.value - Math.sqrt(dis)) / (2 * a.value))
        solutions.push((-1 * b.value + Math.sqrt(dis)) / (2 * a.value))
      } else if (dis === 0) {
        solutions.push((-1 * b.value ) / (2 * a.value))
      }
      // payloadとして解の配列を渡し、ストアのsolutionsを更新する
      $store.dispatch('solveEquation/setResult', solutions)
    }

    return { a, b, c, error, calc }
  }
}
</script>
<style scoped>
  input {
    width: 30px;
    margin: 0 5px;
  }
  .error {
    margin-left: 10px;
    font-weight: bold;
    color: red;
  }
</style>