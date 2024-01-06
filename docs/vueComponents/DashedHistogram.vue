<script>
export default {
  name: 'DashedHistogram',
  props: {
    contentPosition: {
      type: String,
      default: 'top',
    },
    barColor: {
      type: String,
      default: '#0084ff',
    },
    unitOfMeasurement: String,
    value: [String, Number],
    max: [String, Number],
    percent: { type: [String, Number], required: false },
    barWidth: {
      type: String,
      default: '38px',
    },
  },
  data() {
    return {
      elementNumber: 0,
      elementHeight: 9,
    }
  },
  computed: {
    calculatedPercent() {
      let percent = 0
      if (this.percent)
        percent = Math.min(this.percent, 1)
      else if (this.max && this.value)
        percent = parseFloat(this.value) / parseFloat(this.max)

      return percent
    },
    clipStyle() {
      return {
        'clip-path': `inset(0 0 ${this.calculatedPercent * 100}% 0px)`,
      }
    },
  },
  mounted() {
    this.elementNumber = Math.floor((this.$refs.container.clientHeight + 4) / 9)
    this.$refs.container.style.height = `${this.elementNumber * 9 + 8}px`
  },
}
</script>

<template>
  <div class="h-full flex flex-col items-center">
    <!-- 上边文字 -->
    <div
      v-if="contentPosition === 'top'" class="text-white text-center rounded mb-2 p-1 px-1.8em value-wrapper" :style="{
        background: `linear-gradient(transparent,${`${barColor}6f`})`,
      }"
    >
      <span>{{ value }}</span><span>{{ unitOfMeasurement }}</span>
    </div>
    <div ref="container" class="flex-1 relative border border-solid border-[#205DCF]" :style="{ width: barWidth }">
      <!-- 右边值显示 -->
      <div
        v-if="contentPosition === 'right'" class="flex items-center absolute left-[110%]"
        :style="{ bottom: `calc(${calculatedPercent * 100}% - 20px)` }"
      >
        <img src="@/assets/imgs/left-arrow.svg" alt="right" class="mr-4px">
        <div class="data-box">
          {{ (value || "-") + unitOfMeasurement }}
        </div>
      </div>
      <!-- 左边值显示 -->
      <div
        v-if="contentPosition === 'left'" class="flex items-center absolute right-[110%]"
        :style="{ bottom: `calc(${calculatedPercent * 100}% - 20px)` }"
      >
        <div class="data-box">
          {{ (value || "-") + unitOfMeasurement }}
        </div>
        <img src="@/assets/imgs/left-arrow.svg" alt="left" class="ml-4px transform rotate-180">
      </div>

      <div class="p-4px">
        <div
          v-for="i in elementNumber" :key="i" class="mb-[4px] last:mb-0 h-5px"
          :style="{ 'background-color': barColor }"
        />
      </div>
      <div class="p-4px absolute top-0 w-full transition-clip-path duration-500" :style="clipStyle">
        <div v-for="i in elementNumber" :key="i" class="mb-[4px] last:mb-0 h-5px bg-gray-400" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.data-box {
  background: radial-gradient(transparent, #04355e);
  @apply whitespace-nowrap border border-solid border-[#074976] p-0.5em rounded;
}

.triangle-left {
  border-left: 13px solid #409eff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.value-wrapper {
  position: relative;

  &::after {
    content: "";
    @apply absolute right-0px top-0 w-0 h-0 block border-0 border-solid border-b-63px border-l-60px;
    border-bottom-color: #030b21;
    border-left-color: transparent;
    border-right-color: transparent;
  }

  &::before {
    content: "";
    @apply absolute -left-30px top-0 w-0 h-0 block border-0 border-solid border-t-63px border-r-60px;
    border-top-color: #030b21;
    border-left-color: transparent;
    border-right-color: transparent;
  }
}
</style>
