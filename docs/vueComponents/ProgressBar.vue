<script>
export class ProgressData {
  /**
   * @param {number} value 百分比 两位数
   * @param {string} color 滚动条颜色
   * @param {string} [content] 滚动条上文字
   */
  constructor(value, color, content) {
    this.value = value
    this.color = color
    this.content = content
  }
}
export default {
  name: 'ProgressBar',
  props: {
    data: [Object, Array],
    strokeRadius: {
      type: Number,
      default: 5,
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    endBar: { type: Boolean, default: false },
  },
  computed: {
    data1() {
      const arr = Array.isArray(this.data) ? this.data : [this.data]
      return arr.map(item => ({
        ...item,
        id: Math.random(),
      }))
    },

    endBarSize() {
      return this.strokeWidth + 3
    },
  },
  methods: {
    strokeStyle(item) {
      const res = {
        'border-radius': `${this.strokeRadius}px`,
        'width': `${item.value}%`,
        'height': `${this.strokeWidth}px`,
      }
      if (item.color)
        res.background = item.color

      return res
    },
  },
}
</script>

<template>
  <div
    class="flex items-center min-h-6px " :style="{
      'border-radius': `${strokeRadius}px`,
    }"
  >
    <div
      v-for="item in data1" :key="item.id" class="text-center h-full transition-all relative"
      :class="{ 'bg-gradient-to-r from-hex-042e42/65 to-[#00EAFF]': !item.color }" :style="strokeStyle(item)"
    >
      {{ item.content }}
      <!-- concentric circles -->
      <div
        v-if="endBar && item.value > 0"
        class="absolute bg-[#8EFFCE] rounded-full z-10 top-[50%] transform -translate-y-[50%] right-0 translate-x-[50%]"
        :style="{
          width: `${endBarSize}px`,
          height: `${endBarSize}px`,
        }"
      />
      <div
        v-if="endBar && item.value > 0"
        class="absolute right-0 bg-hex-8effce/8 h-20px w-20px rounded-full z-9 top-[50%] transform right-0 translate-x-[50%] -translate-y-[50%]"
        :style="{}"
      />
      <div
        v-if="endBar && item.value > 0"
        class="absolute right-0 bg-transparent h-34px w-34px rounded-full z-9 top-[50%] transform right-0 translate-x-[50%] -translate-y-[50%] border-3px border-solid border-hex-8effce/8"
        :style="{}"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
