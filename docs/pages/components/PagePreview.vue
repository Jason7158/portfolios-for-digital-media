<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const fullScreen = ref(false)
const pageWrapper = ref(null)

onMounted(() => {
  const el = pageWrapper.value.children[0]
  const ob = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect
    const rate = width / el.clientWidth
    el.style.transform = `scale(${rate})`
  })
  ob.observe(pageWrapper.value)
})
</script>

<template>
  <div
    class="bg-white/95 " :class="{
      'relative': !fullScreen,
      'pb-9/16': !fullScreen,

      'fixed': fullScreen,
      'w-100vw': fullScreen,
      'h-100vh': fullScreen,
      'z70': fullScreen,
      'top-0': fullScreen,
      'left-0': fullScreen,
    }"
  >
    <i
      v-if="!fullScreen" class="i-lucide-fullscreen inline-block absolute top-4 right-4 cursor-pointer z20"
      @click="fullScreen = true"
    />
    <i
      v-if="fullScreen" class="i-mdi-close-box-outline fixed top-4 right-4 cursor-pointer z40"
      @click="fullScreen = false"
    />
    <!-- max width 1920px -->
    <div
      ref="pageWrapper" class="absolute overflow-hidden" :class="{
        'h-full': !fullScreen,
        'w-full': !fullScreen,
        'left-0': !fullScreen,
        'top-0': !fullScreen,

        'top-50%': fullScreen,
        'left-50%': fullScreen,
        'w-90vw': fullScreen,
        'h-[calc((9/16)*90vw)]': fullScreen,
        'max-w-1920px': fullScreen,
        'max-h-1080px': fullScreen,
        // 'overflow-y-auto': fullScreen,
        '-transform-translate-50%': fullScreen,
      }"
    >
      <slot class="bbbb" />
    </div>
  </div>
</template>

<style></style>
