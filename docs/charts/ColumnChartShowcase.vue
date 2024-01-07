<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import ComponentShowcase from '../vueComponents/ComponentShowcase.vue'

let eIns
function genOption() {
  const data = (() => {
    const data = []
    for (let i = 0; i < 50; i++) {
      data.push(
        { name: `Data${i}`, value: Math.round(Math.random() * 1000) },
      )
    }
    return data
  })()

  const label = {
    label: {
      show: true,
      position: 'right',
      color: '#3B6EEB',
      fontSize: 24,
      formatter: '{rect|} {c} unit',
      fontWeight: 'bold',
      rich: {
        rect: {
          height: 34,
          width: 10,
          backgroundColor: '#3B6EEB',
        },
      },
    },
    labelLayout(params) {
      return {
        x: params.rect.x + params.rect.width - 10,
        y: params.rect.y + params.rect.height / 2,
        verticalAlign: 'middle',
        align: 'left',
      }
    },
  }
  const color = {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#33D8E2', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#0363F4', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  }

  return {
    grid: {
      left: 90,
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#fff', fontSize: 24 },
      splitLine: { lineStyle: { type: 'dotted', color: '#A4DAFF56' } },
      name: 'unit',
      nameTextStyle: { color: '#fff', fontSize: 24, align: 'left', padding: [0, 0, 10, -50] },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#E7E7E8', fontSize: 24 },
      type: 'category',
      data: data.map(item => item.name),
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '93%',
        rangeMode: ['value', 'value'],
        startValue: 0,
        endValue: 10,
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        rangeMode: ['value', 'value'],
        startValue: 0,
        endValue: 10,
      },
    ],
    series: [
      {
        data: data.map(item => item.value),
        type: 'bar',
        barWidth: 24,
        itemStyle: {
          color,
          borderRadius: [0, 5, 5, 0],
        },
        ...label,
      },
    ],
  }
}
const c = ref(null)
function render() {
  eIns.setOption(genOption())
}

onMounted(() => {
  eIns = echarts.init(c.value)
  render()
})
</script>

<template>
  <ComponentShowcase>
    <template #left>
      <div ref="c" class="h387px" />
    </template>
  </ComponentShowcase>
</template>

<style></style>
