<script lang="ts" setup>
import { ref } from 'vue'
import ComponentShowcase from './ComponentShowcase.vue'
import TimeSwitch from './TimeSwitch.vue'

const data = ref('Annually')
const dimensions = ['Annually', 'Monthly', 'Daily']
</script>

<template>
  <ComponentShowcase>
    <template #left>
      <div class="bg-[#0d2031] py-4">
        <TimeSwitch v-model="data" :values="dimensions" class="w280px text-white" />
      </div>
    </template>
    <template #right>
      <div class="pl30px">
        <div class=" text-gray-600 mb2 flex-none">
          Current date range:
        </div>
        <el-select v-model="data" size="small">
          <el-option v-for="d in dimensions" :key="d" :label="d" :value="d" />
        </el-select>
      </div>
    </template>
  </ComponentShowcase>
</template>

<style></style>
