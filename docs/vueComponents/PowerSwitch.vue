<script>
export default {
  name: 'PowerSwitch',
  props: {
    /** 开关prop
     * 顺序编号超大越靠右
     * false 为开关打开（断电）
     * true 为开关闭合（通电）
     */
    switch1Data: {
      type: Object,
      default: () => ({}),
    },
    switch2Data: {
      type: Object,
      default: () => ({}),
    },
    switch3Data: {
      type: Object,
      default: () => ({}),
    },
    switch4Data: {
      type: Object,
      default: () => ({}),
    },
    switch5Data: {
      type: Object,
      default: () => ({}),
    },
    switch6Data: {
      type: Object,
      default: () => ({}),
    },
    switch7Data: {
      type: Object,
      default: () => ({}),
    },
    machine1Name: {
      type: String,
      default: '',
    },
    switch1Name: {
      type: String,
      default: '',
    },
    switch2Name: {
      type: String,
      default: '',
    },
    machine2Name: {
      type: String,
      default: '',
    },
    switch3Name: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div>
    <svg id="闭合" class="w-full" xmlns="http://www.w3.org/2000/svg" height="102.5" viewBox="0 0 200 102.5">
      <g id="组_4212" data-name="组 4212">
        <rect id="矩形_1244" data-name="矩形 1244" class="cls-1" x="32.5" y="37.5" width="104" height="45" />
        <ellipse id="椭圆_1246" data-name="椭圆 1246" class="cls-2" cx="313" cy="60.5" rx="14.5" ry="14" />
        <ellipse id="椭圆_1246_拷贝" data-name="椭圆 1246 拷贝" class="cls-2" cx="333" cy="60.5" rx="14.5" ry="14" />
        <rect id="矩形_1244_拷贝" data-name="矩形 1244 拷贝" class="cls-1" x="270.5" y="37.5" width="104" height="45" />
        <rect id="矩形_1244_拷贝_2" data-name="矩形 1244 拷贝 2" class="cls-1" x="554.5" y="1.5" width="104" height="45" />
        <path id="形状_1257" data-name="形状 1257" class="cls-3" d="M24,70H48" transform="translate(-13.5 -11.5)" />
        <path id="形状_1257_拷贝" data-name="形状 1257 拷贝" class="cls-3" d="M149,70h14" transform="translate(-13.5 -11.5)" />
        <path
          id="形状_1257_拷贝_3" data-name="形状 1257 拷贝 3" class="cls-3" d="M186,70h59"
          transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1257_拷贝_4" data-name="形状 1257 拷贝 4" class="cls-3" d="M268,70h16"
          transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1257_拷贝_5" data-name="形状 1257 拷贝 5" class="cls-3" d="M388,70h36"
          transform="translate(-13.5 -11.5)"
        />
        <circle id="椭圆_1264" data-name="椭圆 1264" class="cls-4" cx="7" cy="60" r="5.5" />
        <path id="形状_1260" data-name="形状 1260" class="cls-3" d="M672,34h495" transform="translate(-13.5 -11.5)" />
        <path
          id="形状_1257_拷贝_2" data-name="形状 1257 拷贝 2" class="cls-3" d="M448,70h29l24-37h67"
          transform="translate(-13.5 -11.5)"
        />
        <g id="组_4210" data-name="组 4210">
          <g id="g_switch_1" v-tooltip="switch1Data" data-name="组 4181">
            <path
              id="switch-1" data-name="形状 1300" class="cls-8" :class="{ noPower: switch1Data?.value === '0' }"
              d="M157,58.5h16"
            />
            <circle id="椭圆_1266_拷贝" data-name="椭圆 1266 拷贝" class="cls-6" cx="152.5" cy="59.5" r="4" />
          </g>
          <g id="组_4181-2" v-tooltip="switch2Data" data-name="组 4181">
            <path
              id="switch-2" data-name="形状 1300" :class="{ noPower: switch2Data?.value === '0' }" class="cls-8"
              d="M238.5,58.5h16"
            />
            <circle id="椭圆_1266_拷贝-2" data-name="椭圆 1266 拷贝" class="cls-6" cx="234.5" cy="59.5" r="4" />
          </g>
          <g id="组_4181-3" v-tooltip="switch3Data" data-name="组 4181">
            <path
              id="switch-3" data-name="形状 1300" :class="{ noPower: switch3Data?.value === '0' }" class="cls-8"
              d="M418.5,58.5h16"
            />
            <circle id="椭圆_1266_拷贝-3" data-name="椭圆 1266 拷贝" class="cls-6" cx="414.5" cy="59.5" r="4" />
          </g>
        </g>
      </g>
      <g id="组_4213_拷贝" v-tooltip="switch7Data" data-name="组 4213 拷贝">
        <path
          id="machine-4" data-name="形状 1282" :class="{ noPower: switch7Data?.value === '0' }" class="cls-7"
          d="M1129,93l-16,13h-27" transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1261_拷贝_4" data-name="形状 1261 拷贝 4" class="cls-3" d="M1167,32.8V62l-16,14"
          transform="translate(-13.5 -11.5)"
        />
        <circle id="椭圆_1266" data-name="椭圆 1266" class="cls-6" cx="1134.5" cy="65.5" r="4" />
        <path
          id="switch-4" data-name="形状 1267" :class="{ noPower: switch7Data?.value === '0' }" class="cls-8"
          d="M1114.5,82.5l18-14"
        />
      </g>
      <g id="组_4213" v-tooltip="switch6Data" data-name="组 4213">
        <path
          id="machine-5" data-name="形状 1282" :class="{ noPower: switch6Data?.value === '0' }" class="cls-7"
          d="M988,93l-16,13H945" transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1261_拷贝_4-2" data-name="形状 1261 拷贝 4" class="cls-3" d="M1026,32.8V62l-16,14"
          transform="translate(-13.5 -11.5)"
        />
        <g id="组_4214" data-name="组 4214">
          <circle id="椭圆_1266-2" data-name="椭圆 1266" class="cls-6" cx="993.5" cy="65.5" r="4" />
          <path
            id="switch-5" data-name="形状 1267" :class="{ noPower: switch6Data?.value === '0' }" class="cls-8"
            d="M973.5,82.5l18-14"
          />
        </g>
      </g>
      <g id="组_4213_拷贝_3" v-tooltip="switch5Data" data-name="组 4213 拷贝 3">
        <path
          id="machine-6" data-name="形状 1282" :class="{ noPower: switch5Data?.value === '0' }" class="cls-7"
          d="M848,93l-16,13H805" transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1261_拷贝_4-3" data-name="形状 1261 拷贝 4" class="cls-3" d="M886,32.8V62L870,76"
          transform="translate(-13.5 -11.5)"
        />
        <circle id="椭圆_1266-3" data-name="椭圆 1266" class="cls-6" cx="853.5" cy="65.5" r="4" />
        <path
          id="switch-6" data-name="形状 1267" :class="{ noPower: switch5Data?.value === '0' }" class="cls-8"
          d="M833.5,82.5l18-14"
        />
      </g>
      <g id="组_4213_拷贝_2" v-tooltip="switch4Data" data-name="组 4213 拷贝 2">
        <path
          id="machine-7" data-name="形状 1282" :class="{ noPower: switch4Data?.value === '0' }" class="cls-7"
          d="M707,93l-16,13H664" transform="translate(-13.5 -11.5)"
        />
        <path
          id="形状_1261_拷贝_4-4" data-name="形状 1261 拷贝 4" class="cls-3" d="M745,32.8V62L729,76"
          transform="translate(-13.5 -11.5)"
        />
        <circle id="椭圆_1266-4" data-name="椭圆 1266" class="cls-6" cx="712.5" cy="65.5" r="4" />
        <path
          id="switch-7" data-name="形状 1267" :class="{ noPower: switch4Data?.value === '0' }" class="cls-8"
          d="M692.5,82.5l18-14"
        />
      </g>
      <text id="组合开关" class="cls-9" x="575" y="28">组合开关</text>
      <text id="采煤机" class="cls-10" x="623.583" y="99.495">采煤机</text>
      <text id="刮板机" class="cls-10" x="762.583" y="99.495">刮板机</text>
      <text id="转载机" class="cls-10" x="903.584" y="99.495">转载机</text>
      <text id="破碎机" class="cls-10" x="1045.583" y="99.495">破碎机</text>

      <text class="cls-10" x="84" y="64" textLength="94px" lengthAdjust="spacingAndGlyphs">
        {{ machine1Name }}
      </text>
      <text class="cls-10" x="322" y="24">{{ machine2Name }}</text>
      <text class="cls-10" x="160" y="20">{{ switch1Name }}</text>
      <text class="cls-10" x="234" y="101">{{ switch2Name }}</text>
      <text class="cls-10" x="416" y="101">{{ switch3Name }}</text>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
#switch-1.noPower {
  transform: rotate(310deg);
  transform-origin: 153px 58.5px;
}

#switch-2.noPower {
  transform: rotate(310deg);
  transform-origin: 234.5px 58.5px;
}

#switch-3.noPower {
  transform: rotate(310deg);
  transform-origin: 414.5px 58.5px;
}

#switch-4.noPower {
  transform: rotate(68deg);
  transform-origin: 1135px 66px;
}

#switch-5.noPower {
  transform: rotate(68deg);
  transform-origin: 993.8px 66px;
}

#switch-6.noPower {
  transform: rotate(68deg);
  transform-origin: 854.5px 66px;
}

#switch-7.noPower {
  transform: rotate(68deg);
  transform-origin: 714.5px 66px;
}

#machine-4.noPower {
  stroke: #db0000;
}

#machine-5.noPower {
  stroke: #db0000;
}

#machine-6.noPower {
  stroke: #db0000;
}

#machine-7.noPower {
  stroke: #db0000;
}

.cls-1,
.cls-2,
.cls-3,
.cls-5,
.cls-6,
.cls-7,
.cls-8 {
  fill: none;
}

.cls-1,
.cls-2,
.cls-3,
.cls-4,
.cls-7 {
  stroke: #16ac45;
}

.cls-1,
.cls-3,
.cls-4,
.cls-8,
.cls-7 {
  stroke-width: 3px;
}

.cls-2,
.cls-6 {
  stroke-width: 2px;
}

.cls-3,
.cls-5,
.cls-7,
.cls-8 {
  fill-rule: evenodd;
}

.cls-4 {
  fill: #16ac45;
}

.cls-5,
.cls-6,
.cls-8 {
  stroke: #16f7ff;
}

.cls-10,
.cls-9 {
  font-size: 16px;
  fill: gray;
}

.cls-10 {
  text-anchor: middle;
}

.stroke-red {
  stroke: #db0000;
}
</style>
