<script>
export default {
  name: 'TimeSwitch',
  props: {
    values: {
      type: Array,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
}
</script>

<template>
  <div class="flex items-center w-full justify-center">
    <span
      v-for="val in values"
      :key="val"
      class="unit"
      :class="{ active: modelValue === val }"
      @click="$emit('update:modelValue', val)"
    >{{ val }}</span>
  </div>
</template>

<style lang="scss" scoped>
.unit {
  @apply text-white px2 py0.5 not-last:mr-6px border-[#037E89] border-solid border inline-block text-center cursor-pointer text-sm leading-1.7em;
  background-image: radial-gradient(circle at center, transparent, #0b4864);
}
.active {
  @apply border-[#00e2f7];
  background-image: radial-gradient(circle at center, transparent 10%, #66b1d3);
}
</style>
