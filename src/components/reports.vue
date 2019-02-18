<template>
  <el-card>
    <!-- 面包屑导航 -->
    <crumbs val1="财务管理" val2="统计报表"></crumbs>
    <!-- 表单部分 -->
    <chart :options="orgOptions" :loading="loading"></chart>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        orgOptions: {},
        loading: {}
      }
    },
    mounted() {
      this.orgOptions = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {
          // 控制鼠标滑过折线点出现的窗口内容哪个坐标值在上 默认series中标注的name值
          // 加了trigger: 'axis'之后就变成折线点对应的x轴坐标值在上方
          trigger: 'axis',
          // 去掉鼠标滑过折线点的时候默认出现的线条
          axisPointer: {
            type: 'none'
          }
        },
        legend: {
          data: ['销量']
        },
        // xAxis: {
        //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        // },
        // yAxis: {},
        // series: [{
        //   name: '销量',
        //   type: 'bar',
        //   data: [5, 20, 36, 10, 10, 20]
        // }]
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '销售额',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
          smooth: true
        }]
      }
    }
  }
</script>
<style>
  .echarts {
    width: 100%;
    height: 600px;
  }
</style>
