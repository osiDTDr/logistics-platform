<template>
  <div class="app-container">
    <el-form ref="form" label-width="150px" inline>
      <el-form-item label="统计时间: " prop="recordTime">
        <el-date-picker v-model="listQuery.recordTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" align="right" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit()">查询</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery()">重置</el-button>
      </el-form-item>
    </el-form>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { fetchList } from '@/api/goods'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '90%'
    },
    height: {
      type: String,
      default: '700px'
    }
  },
  data() {
    return {
      chart: null,
      listQuery: {
        // current: 1,
        // size: 10,
        recordTimeStart: '',
        recordTimeEnd: ''
        // recordTime: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个季度',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    onSubmit() {
      this.listQuery.recordTimeStart = this.listQuery.recordTime[0]
      this.listQuery.recordTimeEnd = this.listQuery.recordTime[1]
      this.chart.showLoading()
      fetchList(this.listQuery).then(res => {
        this.chart.hideLoading()
        const data = res.data.data
        this.chart.setOption({
        //   backgroundColor: '#e4e7ed',
          title: {
            text: '维护功能使用频次统计'
          },
          tooltip: {},
          toolbox: {},
          legend: {
            data: ['维护功能使用频次']
          },
          xAxis: {
            type: 'category',
            data: data.category,
            axisLabel: { interval: 0, rotate: 30 }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '维护功能使用频次',
            type: 'bar',
            data: data.value,
            color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
          }]
        })
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
    },
    resetQuery() {
      this.listQuery.recordTime = ''
    }
  }
}
</script>
