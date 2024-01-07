export function genOption() {
const data = [
{ name: 'John', value: 10 },
{ name: 'Doe', value: 20 }
];

const dataZoom = {
dataZoom: [
{
type: 'slider',
show: true,
yAxisIndex: [0],
left: '93%',
rangeMode: ['value', 'value'],
startValue: 0,
endValue: 10,
},
{
type: 'inside',
yAxisIndex: [0],
rangeMode: ['value', 'value'],
startValue: 0,
endValue: 10,
},
],
};
const label = {
label: {
show: true,
position: 'right',
color: '#fff',
fontSize: 24,
formatter: '{rect|} {c} wt',
fontWeight: 'bold',
rich: {
rect: {
height: 44,
width: 10,
backgroundColor: '#fff',
},
},
},
labelLayout(params) {
return {
x: params.rect.x + params.rect.width - 10,
y: params.rect.y + params.rect.height / 2,
verticalAlign: 'middle',
align: 'left',
};
},
};
const color = {
type: 'linear',
x: 0,
y: 0,
x2: 1,
y2: 0,
colorStops: [
{
offset: 0,
color: '#33D8E2', // 0% 处的颜色
},
{
offset: 1,
color: '#0363F4', // 100% 处的颜色
},
],
global: false, // 缺省为 false
};
const borderRadius = [0, radius, radius, 0];
const axisOption = {
xAxis: {
type: 'value',
axisLine: { show: false },
axisTick: { show: false },
axisLabel: { color: '#fff', fontSize: 24 },
splitLine: { lineStyle: { type: 'dotted', color: '#A4DAFF56' } },
name: this.unit,
nameTextStyle: { color: '#fff', fontSize: 24, align: 'left', padding: [0, 0, 10, -50] },
},
yAxis: {
axisLine: { show: false },
axisTick: { show: false },
axisLabel: { color: '#fff', fontSize: 24 },
type: 'category',
data: this.data.map(item => item.name),
},
};
return {
...axisOption,
...dataZoom,
series: [
{
data: this.data.map(item => item.value),
type: 'bar',
barWidth: 24,
itemStyle: {
color,
borderRadius,
},
...label,
},
],
};
}
