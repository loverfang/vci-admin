<template>
  <div class="dashboard-container">
    <div>控制台</div>
    <panel-group/>

    <el-row :gutter="40" style="margin-top: 30px;">
      <el-col :span="12">
        <el-card shadow="always" header="最新文章">
          <el-table :data="newsList" style="width: 100%" :show-header="false">
            <el-table-column prop="title"> </el-table-column>
            <el-table-column min-width="30px">
              <template slot-scope="scope">
                <span>{{ scope.row.pubtime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" header="视频排行榜">
          <el-table :data="videosList" style="width: 100%" :show-header="false">
            <el-table-column prop="title"> </el-table-column>
            <el-table-column prop="pubtime" min-width="30px"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" header="最新会员">
          <el-table :data="memberList" style="width: 100%" :show-header="false">
            <el-table-column prop="name"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import { fetchNewsList, fetchVideosList, fetchMemberList } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  data() {
    return {
      newsList: null,
      videosList: null,
      memberList: null
    }
  },
  created() {
    this.fetchNewsList()
    this.fetchVideosList()
    this.fetchMemberList()
  },
  methods: {
    fetchNewsList() {
      this.listLoading = true
      fetchNewsList().then(response => {
        this.newsList = response.data.items
        this.listLoading = false
      })
    },
    fetchVideosList() {
      this.listLoading = true
      fetchVideosList().then(response => {
        this.videosList = response.data.items
        this.listLoading = false
      })
    },
    fetchMemberList() {
      this.listLoading = true
      fetchMemberList().then(response => {
        this.memberList = response.data.items
        this.listLoading = false
      })
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
