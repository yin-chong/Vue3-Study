<template>
  <div class="main">
    <!-- 文件列表 -->
    <div class="files">
      <div class="file" v-for="(item, index) in files" :key="item.name" @click="downloadFile(item.name)">
        <img src="../assets/file/excel.png" class="file-icon" />
        <div class="file-label">{{ `0${index + 1}${item.name}.csv` }}</div>
      </div>
    </div>
    <div class="content">
      <el-row style="height: 50%">
        <!-- TEL Intelligent Etch Dashboard 图表 -->
        <el-col :span="8" :offset="0">
          <div class="box" id="canvas1"></div>
        </el-col>
        <!-- GoldenCham 数据渲染 -->
        <el-col :span="4" :offset="0" class="box wrap">
          <div class="wrap-title">Golden Cham:</div>
          <div class="wrap-val" style="margin-bottom: 20px;">{{ GoldenChamData[0] }}</div>
          <div class="wrap-subtitle">Recipe:</div>
          <div class="wrap-val" style="margin-top: 10px;">{{ GoldenChamData[3] }}</div>
          <div class="row" style="margin-top: 10px;">
            <div class="wrap-subtitle">From:</div>
            <div class="wrap-val">{{ GoldenChamData[1] }}</div>
          </div>
          <div class="row" style="margin-top: 10px;">
            <div class="wrap-subtitle">To:</div>
            <div class="wrap-val">{{ GoldenChamData[2] }}</div>
          </div>
        </el-col>
        <el-col :span="12" :offset="0">
          <!-- G2G -->
          <el-row style="height: 50%;">
            <el-col :span="12" :offset="0" class="box wrap">
              <div class="wrap-title">G2G Performance</div>
              <div class="row">
                <div class="row-item">
                  <div class="wrap-subtitle" style="margin-bottom: 10px;">Base(h):</div>
                  <div class="wrap-val">{{ G2GData[0] }}</div>
                </div>
                <div class="row-item">
                  <div class="wrap-subtitle" style="margin-bottom: 10px;">Average(h):</div>
                  <div class="wrap-val">{{ G2GData[1] }}</div>
                </div>
                <div class="row-item">
                  <div class="wrap-subtitle" style="margin-bottom: 10px;">Count:</div>
                  <div class="wrap-val">{{ G2GData[3] }}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12" :offset="0">
              <div class="box wrap" id="canvas2"></div>
            </el-col>
          </el-row>
          <!-- OER -->
          <el-row style="height: 50%;">
            <el-col :span="12" :offset="0" class="box wrap" style="padding: 10px;">
              <div class="wrap-title">Seasoning Available@</div>
              <div class="row">
                <div class="row-item">
                  <div class="wrap-subtitle" style="margin-bottom: 10px;">Base(h):</div>
                  <div class="wrap-val">14</div>
                </div>
                <div class="row-item">
                  <div class="wrap-subtitle" style="margin-bottom: 10px;">Average(h):</div>
                  <div class="wrap-val">20</div>
                </div>
              </div>
            </el-col>
            <el-col :span="12" :offset="0">
              <div class="box" id="canvas3" style="padding: 10px;"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="height: 50%">
        <el-col :span="16" :offset="0">
          <div class="box" id="canvas4"></div>
        </el-col>
        <!-- Predicti n by Virtual Metrology: -->
        <el-col :span="8" :offset="0" class="box wrap" style="padding: 30px 15px;">
          <div class="wrap-title">Predicti n by Virtual Metrology:</div>
          <div class="row">
            <div class="wrap-index">1</div>
            <div class="wrap-subtitle" style="width: 100%;">Chambers request PM within 2 days</div>
          </div>
          <div class="row" style="margin-top: 20px;">
            <div class="wrap-index">?</div>
            <div class="wrap-subtitle" style="width: 100%;">Chambers request PM within 2 days</div>
          </div>
          <div class="row row-end" style="margin-top: 20px;">
            <div class="wrap-subtitle">Go to</div>
            <div class="wrap-title" style="margin-bottom: 0;">Function Pages</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRoute } from "vue-router";
import * as echarts from "echarts/core";
import { BarChart, LineChart  } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent 
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
// 注册所需的模块
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  DataZoomComponent 
]);
import { getFileData } from "../utils/file-processing";
import { formatTime } from "../utils/format";
import { ElMessage } from 'element-plus'
// csv列表
interface FILE {
  name: string;
  path: string;
}
const files: Array<FILE> = [
  { name: "GoldenCham_data", path: "/GoldenCham_data" },
  { name: "GoldenCham", path: "/GoldenCham" },
  { name: "G2G", path: "/G2G" },
  { name: "OER", path: "/OER" },
  { name: "OOC", path: "/OOC" },
  { name: "PM", path: "/PM" },
  { name: "seasoning", path: "/seasoning" },
];

// 文件下载
const startTime = new Date();
const start = formatTime(startTime);
const route = useRoute();
const { userType } = route.query || {};
// console.log(startTime)
function downloadFile(name: string) {
  if(userType == 'manage') window.location.href = `/${name}.csv`;
};
onMounted(() => {
  getCanvas1Data();
  getCanvas2Data();
  getCanvas3Data();
  renderCanvas4();
});
// TEL Intelligent Etch Dashboard 图表数据获取
async function getCanvas1Data() {
  const arr = await getFileData("/GoldenCham_data.csv");
  renderCanvas1(arr);
}
// TEL Intelligent Etch Dashboard 图表渲染
function renderCanvas1(arr: Array<any>) {
  let y1: Array<string> = [];
  let y2: Array<string> = [];
  let xData: Array<number> = [];
  // let [y1: Array<string>, y2: Array<string>, x: Array<number>] = [[], [], []];
  for (let index = 1; index < arr.length; index++) {
    const el = arr[index];
    y1.push(el[1]);
    y2.push(el[2]);
    const num = Number( el[3].slice(0, -1));
    xData.push(num)
  };
  const chartDom = document.getElementById("canvas1");
  const chart = echarts.init(chartDom);
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      show: false
    },
    title: {
      text: 'TEL Intelligent Etch Dashboard',
      textStyle: {
        color: '#fff',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 20
      },
      padding: [20, 0 , 10, 20]
    },
    grid: {
      left: "3%",
      right: "12%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: '#565656'
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "category",
      data: y1,
      axisLabel: {
        formatter: function (value: string, index: number) {
          const data1 = value; // 第一个数据
          const data2 = y2[index]; // 第二个数据

          // 返回拼接后的标签
          return `{a|${data1}}-{b|${data2}}`;
        },
        rich: {
          a: {
            // a 是用于第一个数据的样式
            color: '#fff', // 颜色
            fontSize: 14, // 字号
          },
          b: {
            // b 是用于第二个数据的样式
            color: '#fff', // 颜色
            fontSize: 14, // 字号
            rotate: -90,
            // textStyle: {
            //   transform: 'rotate(-90deg)', // 逆时针旋转 90 度
            //   transformOrigin: 'center center', // 旋转中心
            // },
          },
        },
      }
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          formatter: '{c}%'
        },
        emphasis: {
          focus: "series",
        },
        data: xData,
        itemStyle: {
          color: function(params: any) {
            // 根据索引动态设置颜色
            const index = params.dataIndex;
            const color: string = index == y1.length - 1 ? '#f0d467' : '#c9c9c9';
            return color;
          },
        },
      },
    ],
  };

  chart.setOption(options);
}
// GoldenCham 数据获取
let GoldenChamData = ref([]);
getFileData("/GoldenCham.csv").then(res => {
  GoldenChamData.value = res[1];
})
// G2G 数据获取
let G2GData = ref([]);
async function getCanvas2Data() {
  let res = await getFileData("/G2G.csv");
  const arr = res[1];
  const val1 = (Number(arr[2]) * 100).toFixed(1);
  const val2 = (Number(arr[4]) * 100).toFixed(1);
  arr[2] = val1;
  arr[4] = val2;
  G2GData.value = arr;
  renderCanvas2();
}
// G2G 图表渲染
function renderCanvas2() {
  const data = [G2GData.value[2], G2GData.value[4]];
  const chartDom = document.getElementById("canvas2");
  const chart = echarts.init(chartDom);
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      show: false
    },
    title: {
      text: 'MeetRatio-24h',
      textStyle: {
        color: '#fff',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 16
      },
      padding: [20, 0 , 10, 20]
    },
    grid: {
      left: "3%",
      right: 0,
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: '#565656'
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "category",
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: ['Direct'], // 设置 Y 轴的数据类别为一维数组
    },
    series: [
    {
      name: "Direct",
      type: "bar",
      stack: "total",
      label: {
        show: true,
        color: '#fff',
        formatter: '{c}%'
      },
      emphasis: {
        focus: "series",
      },
      data: [G2GData.value[2]], // 第一个柱状图系列的数据
      itemStyle: {
        color: '#37da7d', // 第一个柱状图系列的颜色
      },
      zlevel: 2, // 设置第一个柱状图系列的 zlevel
    },
    {
      name: "Indirect",
      type: "bar",
      stack: "total",
      label: {
        show: true,
        color: '#fff',
        formatter: '{c}%'
      },
      emphasis: {
        focus: "series",
      },
      data: [G2GData.value[4]], // 第二个柱状图系列的数据
      itemStyle: {
        color: '#c9c9c9', // 第二个柱状图系列的颜色
      },
      zlevel: 1, // 设置第二个柱状图系列的 zlevel
    },
    ],
  };

  chart.setOption(options);
}
// OER 数据获取
async function getCanvas3Data() {
  const arr = await getFileData("/OER.csv");
  let yData1: Array<number> = [];
  let yData2: Array<number> = [];
  let xData: Array<string> = [];
  for(let i = 1; i < arr.length; i++) {
    const el = arr[i];
    yData1.push(Number(el[1]));
    yData2.push(Number(el[2]));
    xData.push(el[0].slice(-5))
  }
  renderCanvas3(yData1, yData2, xData);
}
// 图表渲染
function renderCanvas3(yData1: Array<number>, yData2: Array<number>, xData: Array<string>) {
  const chartDom = document.getElementById("canvas3");
  const chart = echarts.init(chartDom);
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      show: false
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#565656'
        }
      },
      axisLabel: {
        show: true
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: false
      },
      data: xData,
    },
    yAxis: [
      // 柱状图
      {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: '#565656'
          }
        },
        axisTick: {
          show: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#565656',
            type: 'dashed'
          }
        },
      },
      // 折线图
      {
        type: "value",
        name: '',
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          formatter: '{value}%'
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
        },
      },
    ],
    dataZoom: [
      {    
        type: 'inside',
        start: 0,
        end: 50,
        zoomLock: true,
      }
    ],
    series: [
      {
        name: "stable_slot",
        type: "bar",
        stack: "total",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#6489fb'
        },
        barWidth: 20, // 固定柱子的宽度
        // barGap: 10,
        data: yData1,
      },
      {
        name: "stable_wafer",
        type: "line",
        yAxisIndex: 1,
        label: {
          show: true,
          color: '#fff',
          formatter: '{c}%'
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#ffde5b'
        },
       data: yData2,
      },
    ],
  };
  chart.setOption(options);
  chart.on('click', function (params) {
    ElMessage({
      showClose: true,
      message: `您点击了柱状图, x轴为${params.name} 值为${params.value}`,
      type: 'success',
      duration: 0
    })
  });
}
// Dailly ooc Summary 图表渲染
const xData = ['05-29', '03-12', '03-14', '03-09', '03-09', '04-19', '04-04', '03-15', '05-28', '04-22', '03-29', '04-01', '05-09', '05-28', '05-08', '06-18', '06-17', '06-16', '07-09', '07-06', '06-26', '06-28', '07-06', '07-18', '06-28', '06-29', '07-20'];
let yData1 : Array<number>= [];
let yData2 : Array<number>= [];
let yData3 : Array<number>= [];
let yData4 : Array<number>= [];
let yData5 : Array<number>= [];
let yData6 : Array<number>= [];
xData.map(el => { 
  yData1.push(Math.floor(Math.random() * 9) + 1)
  yData2.push(Math.floor(Math.random() * 9) + 1)
  yData3.push(Math.floor(Math.random() * 30))
  yData4.push(Math.floor(Math.random() * 9) + 1)
  yData5.push(Math.floor(Math.random() * 9) + 1)
  yData6.push(Math.floor(Math.random() * 9) + 1)
});
async function renderCanvas4() {
  const chartDom = document.getElementById("canvas4");
  const chart = echarts.init(chartDom);
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      show: true,
      right: 10,
      top: 40,
      orient:'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      icon: 'circle'
    },
    title: {
      text: 'Dailly ooc Summary',
      textStyle: {
        color: '#c8c4c6',
        fontWeight: 'bold',
        fontSize: 18
      },
      padding: [20, 0 , 10, 20]
    },
    grid: {
      left: 30,
      right: 150,
      bottom: 30,
      top: 70,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#565656'
        }
      },
      axisLabel: {
        show: true
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: false
      },
      data:  xData
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: '#565656'
        }
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#565656',
          type: 'dashed'
        }
      },
    },
    series: [
      {
        name: "FH0000/PM-1",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#6489fb'
        },
        data: yData1
      },
      {
        name: "FH0000/PM-2",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#fb7864'
        },
        data: yData2
      },
      {
        name: "FH0000/PM-3",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#ffde5b'
        },
        data: yData3
      },
      {
        name: "FH0000/PM-4",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#73eca7'
        },
        data: yData4
      },
      {
        name: "FH0000/PM-5",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#ed72dd'
        },
        data: yData5
      },
      {
        name: "FH0000/PM-6",
        type: "line",
        label: {
          show: false,
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: '#72bfed'
        },
        data: yData6
      },
    ]
  }
  chart.setOption(options);
}
// 页面关闭
onBeforeUnmount(() => {
  const endTime = new Date();
  const end = formatTime(endTime);
  const record = {
    start: start,
    end: end,
    userType: userType
  };
  window.sessionStorage.setItem('record', JSON.stringify(record));
})
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px 30px;
}
.files {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 10px;
}
.file {
  width: 100px;
  cursor: pointer;
  &-icon {
    width: 96px;
    height: 96px;
    margin: 0 auto 7px;
  }
  &-label {
    width: 100%;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
.content {
  flex: 1;
  width: 100%;
  background: #2a2a2a;
}
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #151515;
}
.row {
  display: flex;
  align-items: center;
  width: 100%;
  &-item {
    flex: 1;
  }
  &-end {
    justify-content: flex-end;
  }
}
.wrap {
  padding: 40px 10px 10px;
  &-title {
    margin-bottom: 15px;
    font-size: 16px;
    color: #217194;
    text-decoration: underline;
  }
  &-val {
    font-size: 16px;
    color: #fff;
  }
  &-subtitle {
    width: 45px;
    font-size: 12px;
    color: #4e699b;
  }
  &-index {
    width: 25px;
    font-size: 16px;
    color: #fff;
    text-decoration: underline;
  }
}
</style>
