<script setup lang='ts'>
import { useSlots } from 'vue'
import PageShowcase from '../pages/components/PageShowcase.vue'

const slots = useSlots()
</script>

<template>
  <PageShowcase :operable="false">
    <div class="h-full" :class="{ wrapper: slots.right }">
      <div>
        <slot name="left" />
      </div>
      <div v-if="slots.right" class="w1px h80% bg-gray-2 " />
      <div v-if="slots.right">
        <slot name="right" />
      </div>
    </div>
  </PageShowcase>
</template>

<style scoped>
.wrapper{
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  justify-items: center;
  align-items: center;
}
</style>
