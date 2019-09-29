<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Insights Title" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <router-link :to="{path:'/news/insights/create'}">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        添加
      </el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="封面" min-width="10%">
        <!-- 图片的显示 -->
        <template   slot-scope="scope">
          <img :src="scope.row.coverImg"  min-width="70" height="40" :onerror="errorUserPhoto"/>
        </template>
      </el-table-column>
      <el-table-column align="left" label="标题" min-width="25%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" min-width="10%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="8%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="浏览次数" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.viewcount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.pubtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="25%">
        <template slot-scope="scope">
            <!-- 要在最右边区域切换显示页面就用router-link标签 -->
            <router-link :to="'/news/insights/edit/'+scope.row.nid">
              <el-button type="primary" size="small" icon="el-icon-edit">
                编辑
              </el-button>
            </router-link>
            <el-button type=" " size="small" icon="el-icon-delete">
              图片管理
            </el-button>
            <el-button type=" " size="small" icon="el-icon-delete">
              PDF文件管理
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList } from '@/api/article' // 引入需要请求的路径

import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片
export default {
  name: 'InsightsList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        NORMAL: 'success',
        WAITCHECK: 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        title: null,
        ntype: 'insights',
        page: 1,
        limit: 10
      },
      errorUserPhoto: 'this.src="' + userPhoto + '"'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      alert(2)
    }
  }
}
</script>

<style scoped>
  .sindex-input >>> input{
    width: 50%;
    text-align: center;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
