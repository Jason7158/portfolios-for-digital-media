<script setup lang='ts'>
import PageShowcase from '../pages/components/PageShowcase.vue'
</script>

<template>
  <PageShowcase :operable="false">
    <div class="wrapper">
      <div>
        <slot name="left" />
      </div>
      <div class="w1px h80% bg-gray-2 " />
      <div>
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
