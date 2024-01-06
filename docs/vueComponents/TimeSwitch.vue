<template>
  <div class="flex items-center h-24px">
    <span
      v-for="val in values"
      :key="val"
      class="unit"
      :class="{ active: value === val }"
      @click="$emit('update:value', val)"
      >{{ val }}</span
    >
  </div>
</template>

<script>
export default {
  name: "TimeSwitch",
  props: {
    values: {
      type: Array,
    },
    value: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.unit {
  @apply text-white not-last:mr-6px border-[#037E89] border-solid border inline-block text-center cursor-pointer text-sm h-1.7em w-1.7em leading-1.7em;
  background-image: radial-gradient(circle at center, transparent, #0b4864);
}
.active {
  @apply border-[#00e2f7];
  background-image: radial-gradient(circle at center, transparent 10%, #66b1d3);
}
</style>
