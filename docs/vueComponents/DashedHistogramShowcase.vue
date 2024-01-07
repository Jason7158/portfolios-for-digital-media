<script lang="ts" setup>
import { ref } from 'vue'
import ComponentShowcase from './ComponentShowcase.vue'
import DashedHistogram from './DashedHistogram.vue'

const data = ref(41)
</script>

<template>
  <ComponentShowcase>
    <template #left>
      <DashedHistogram :max="100" :value="data" switch1-name="switch" class="!w90% !h-200px " />
    </template>
    <template #right>
      <div class="pl30px flex items-center">
        <div class="mr-4">
          Percentage
        </div>
        <el-input-number v-model="data" size="small" :min="1" :max="100" />
      </div>
    </template>
  </ComponentShowcase>
</template>

<style></style>
