<script lang="ts" setup>
import { computed, ref } from 'vue'
import ComponentShowcase from './ComponentShowcase.vue'
import PowerSwitch from './PowerSwitch.vue'

const isOpen = ref(true)
const map = computed(() => isOpen.value ? '1' : '0')
</script>

<template>
  <ComponentShowcase>
    <template #left>
      <PowerSwitch :switch1-data="{ value: map }" switch1-name="switch" class="!w90%" />
    </template>
    <template #right>
      <div class="pl30px">
        <el-switch
          v-model="isOpen"
          size="small"
          active-text="On"
          inactive-text="Off"
        />
      </div>
    </template>
  </ComponentShowcase>
</template>

<style></style>
