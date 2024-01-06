<script lang="ts" setup>
import { ref } from 'vue'
import ComponentShowcase from './ComponentShowcase.vue'
import ProgressBar, { ProgressData } from './ProgressBar.vue'

const data = ref([new ProgressData(33, '#ef4444', 'Data1'),
  new ProgressData(33, '#84cc16', 'Data2'),
  new ProgressData(34, '#22d3ee', 'Data3')])
</script>

<template>
  <ComponentShowcase>
    <template #left>
      <ProgressBar :data="data" :stroke-width="24" class="w280px text-white" />
    </template>
    <template #right>
      <div class="pl30px">
        <div class="mb3">
          Percentages
        </div>
        <div v-for="(i) in 3" :key="i" class="flex items-center mb-2">
          <span class=" text-gray-600 w7em flex-none">Data{{ i }} value: </span>
          <el-input-number v-model="data[i - 1].value" size="small" :min="1" :max="100" />
        </div>
      </div>
    </template>
  </ComponentShowcase>
</template>

<style></style>
