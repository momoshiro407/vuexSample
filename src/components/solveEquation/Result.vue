<template>
  <div class="solutions">
    <div v-if="isSolvable">
      <ul>
        <li v-for="solution in solutions" :key="solution">X = {{ solution }}</li>
      </ul>
    </div>
    <div v-else>
      <span>実数解は存在しません。</span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const $store = useStore() // Composition APIの場合必須
    // ストアのstateを参照する場合はcomputedで
    const solutions = computed(() => $store.state.solveEquation.solutions)
    const isSolvable = computed(() => $store.state.solveEquation.isSolvable)

    return { solutions, isSolvable }
  }

}
</script>

<style scoped>
  .solutions {
    border: 1px solid #5a5a5a;
    margin-top: 20px;
    padding: 10px;
    width: 300px;
    height: 50px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding-left: 5px;
  }

</style>