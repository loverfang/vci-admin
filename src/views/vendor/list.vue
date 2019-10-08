<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="供应商名称" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="info" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <router-link :to="{path:'/supplier/vendor/create'}">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加
        </el-button>
      </router-link>
      <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-delete" @click="deleteSelectionAll">
        删除选择行
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">>
      <el-table-column
        type="selection"
        width="50"
        align="center"
      />
      <el-table-column align="center" label="供应商Logo" min-width="10%">
        <template slot-scope="scope">
          <img :src="scope.row.coverImg" min-width="70" height="40" :onerror="errorUserPhoto" v-if="scope.row.coverImg !== null">
          <img :src="userPhoto" min-width="70" height="40" v-if="scope.row.coverImg === null">
        </template>
      </el-table-column>
      <el-table-column align="left" label="供应商名称" min-width="25%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="10%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input"  @blur="handleModifyIndex(row)"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="15%">
        <template slot-scope="scope">
          <!-- 要在最右边区域切换显示页面就用router-link标签 -->
          <router-link :to="'/supplier/vendor/edit/' + scope.row.pid">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <router-link :to="'/supplier/vendor/pdflist/' + scope.row.pid">
            <el-button type="" size="small" icon="el-icon-delete">
              PDF文件管理
            </el-button>
          </router-link>
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
import { fetchList, updateSindex, deleteVendor } from '@/api/vendor' // 引入需要请求的路径

import { Message } from 'element-ui'

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
      userPhoto: userPhoto,
      errorUserPhoto: 'this.src="' + userPhoto + '"',
      multipleSelection: [] // 存放选中的数据
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

    // 操作多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleModifyIndex(row) {
      const params = { pid: row.pid, sindex: row.sindex }
      updateSindex(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.getList()
      })
    },

    deleteSelectionAll() {
      const length = this.multipleSelection.length
      if (length <= 0) {
        Message({
          message: '请选中需要删除的记录',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }

      const pids = this.multipleSelection.map(item => item.pid).join() // 获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(pids)

        deleteVendor({ pids: pids }).then(response => {
          if (response.flag === 1) {
            Message({
              message: '删除成功!',
              type: 'success',
              duration: 5 * 1000
            })
            // 删除后刷新数据
            this.listQuery.page = 1
            this.getList()
          } else {
            Message({
              message: '删除失败!',
              type: 'error',
              duration: 5 * 1000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
