<template>
  <div class="dashboard-container">
    <div>控制台</div>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="40" style="margin-top: 30px;">
      <el-col :span="12">
        <el-card shadow="always" header="最新文章">
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="title"> </el-table-column>
            <el-table-column prop="datatime" min-width="30px"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <div><el-card shadow="always">视频排行榜</el-card></div>
      </el-col>
      <el-col :span="6">
        <div><el-card shadow="always">最新会员</el-card></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Dashboard',
  data() {
    return {
      lineChartData: '',
      tableData: [{
        title: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        datatime: '2019-10-11 22:13:45'
      }, {
        title: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        datatime: '2019-10-11 22:13:45'
      }, {
        title: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        datatime: '2019-10-11 22:13:45'
      }, {
        title: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        datatime: '2019-10-11 22:13:45'
      }]
    }
  },
  components: {
    PanelGroup
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
