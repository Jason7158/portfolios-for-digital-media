<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import ComponentShowcase from '../vueComponents/ComponentShowcase.vue'

let eIns
function genOption() {
  const xData = ['2014', '2015', '2016', '2017', '2018', '2019', '2020']
  const data0 = [1, 1, 1, 1, 1, 1, 1]
  const data1 = [10, 50, 100, 35, 55, 30, 20] // Data1
  const data4 = [15, 25, 90, 40, 26, 30, 20] // Data2
  const getvalue1 = [40, 85, 230, 95, 100, 60, 50] // Data3
  const data3 = []
  const data5 = []
  for (let i = 0; i < data1.length; i++)
    data3.push(data1[i] + data4[i])

  for (let i = 0; i < data1.length; i++)
    data5.push(data1[i])

  const maxnum1 = Math.max.apply(null, getvalue1)
  const maxlen1 = 10 ** (String(Math.ceil(maxnum1)).length - 2)
  if (maxnum1 >= 5)
    var max1 = Math.ceil(maxnum1 / (10 * maxlen1)) * maxlen1 * 10

  else
    var max1 = 5

  const option = {
    backgroundColor: '#000E1A', // 背景色
    tooltip: {
      trigger: 'axis',
      borderColor: 'rgba(255,255,255,.3)',
      backgroundColor: 'rgba(13,5,30,.6)',
      textStyle: {
        color: 'white', // 设置文字颜色
      },
      borderWidth: 1,
      padding: 5,
      formatter(parms) {
        const str
                = `year：${
                 parms[0].axisValue
                 }</br>${
                 parms[0].marker
                 }Data1：${
                 parms[0].value
                 }</br>${
                 parms[1].marker
                 }Data2：${
                 parms[1].value
                 }</br>${
                 parms[2].marker
                 }Data3:${
                 parms[2].value}`
        return str
      },
    },
    textStyle: {
      color: '#C9C9C9',
    },

    // color: ['#fbc292', '#06fbfe',  '#f06e91'],
    legend: {
      type: 'scroll',
      orient: 'vertical',
      selectedMode: false, // 图例点击失效
      right: '10%',
      top: '15%',
      textStyle: {
        color: '#ffffff',
        fontSize: 25,
      },

      // data: datas.legendData,
    },
    grid: {
      containLabel: true,
      left: '10%',
      top: '20%',
      bottom: '10%',
      right: '10%',
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#B5B5B5',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 20, // 刻度标签与轴线之间的距离。
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          color: '#FFF',
        },
        fontSize: 25,
        fontStyle: 'bold',
      },
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#B5B5B5',
          },
        },
        splitLine: {
          show: false,
          // lineStyle: {
          //     // 使用深浅的间隔色
          //     color: ["#B5B5B5"],
          //     type: "dashed",
          //     opacity: 0.5,
          // },
        },
        axisLabel: {
          show: false,
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            color: '#FFF',
          },
          fontSize: 20,
        },
      },
      {
        show: false,
        type: 'value',
        min: 0,
        max: max1, // 计算最大值
        interval: max1 / 5, // 平均分为5份
        splitNumber: 5,
        name: '金额（万元）',
        nameTextStyle: {
          color: '#82AFC6',
          fontSize: 12,
          padding: [0, 0, -8, -100],
        },
        axisLabel: {
          formatter(value) {
            const num = value
            if (num && num != 'undefined' && num != 'null') {
              let numS = num
              numS = numS.toString()
              numS = numS.replace(/,/gi, '')
              return numS
            }
            else {
              return num
            }
          },
          color: '#82AFC6',
          textStyle: {
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#3E5B7D',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: '#102E74',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: 'Data1',
        type: 'bar',
        data: data1,
        stack: 'zs',
        barMaxWidth: 'auto',
        barWidth: 60,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#017ebb',
              },
              {
                offset: 1,
                color: '#06fbfe',
              },
            ],
          },
        },
      },

      {
        name: 'Data2',
        type: 'bar',
        data: data4,
        stack: 'zs',
        type: 'bar',
        barMaxWidth: 'auto',
        barWidth: 60,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#fbc292',
              },
              {
                offset: 1,
                color: '#f06e91',
              },
            ],
          },
        },
      },
      {
        name: 'Data3',
        type: 'line',
        data: getvalue1,
        smooth: true,
        symbol: 'none',
        itemStyle: {
          normal: {
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 227, 168, 0)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 227, 168, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 227, 168, 0)',
                },
              ]),
              shadowColor: 'rgba(255, 120, 0,1)',
              shadowBlur: 8,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(197, 106, 255, 0.6)',
                },
                {
                  offset: 0.6,
                  color: 'rgba(255, 120, 0, 0)',
                },
              ]),
            },
          },
        },
      },

      {
        data: data0,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [60, 20],
        zlevel: 2,
        itemStyle: {
          normal: {
            color: '#06fbfe',
          },
        },
      },
      {
        data: data1,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [60, 20],
        zlevel: 2,
      },
      {
        data: data1,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [60, 20],
        zlevel: 2,
      },
      {
        data: data5,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [0, 20],
        zlevel: 2,
      },
      {
        data: data5,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [60, 20],
        zlevel: 2,
        itemStyle: {
          normal: {
            color: '#06fbfe',
          },
        },
      },
      {
        data: data3,
        type: 'pictorialBar',
        barMaxWidth: '20',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [60, 20],
        zlevel: 2,
        itemStyle: {
          normal: {
            color: '#fbc292',
          },
        },
      },
    ],
  }

  return option
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
