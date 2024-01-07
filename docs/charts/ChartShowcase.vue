<script setup lang='ts'>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  option: any
}>()
let eIns
const c = ref(null)
onMounted(() => {
  eIns = echarts.init(c.value)
  eIns.setOption(props.option)
})
</script>

<template>
  <div ref="c" class="w80% h-full" />
</template>

<style>

</style>
