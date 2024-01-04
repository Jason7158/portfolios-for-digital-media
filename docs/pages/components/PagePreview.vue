<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const rootElement = document.documentElement
const aspectRatio = 16 / 9
const fullScreen = ref(false)

// watchEffect(() => {
//   if (fullScreen.value) {
//     const { width } = rootElement.getBoundingClientRect()
//     if (width > 1920) {

//     }
//   }
// })

const pageWrapper = ref(null)

onMounted(() => {
  const ob = new ResizeObserver((entries) => {
    console.log(entries)
  })
  ob.observe(pageWrapper.value)
  console.log(pageWrapper)
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
      ref="pageWrapper"
      class="absolute bg-blue-5" :class="{
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
