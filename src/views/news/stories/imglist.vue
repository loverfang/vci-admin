<template>
  <div class="app-container">
    <div class="filter-container">
      <NewsImageUpload ref="imageUpload" :nid="listQuery.nid" @successUploadCBK="getList" />
      <div class="editor-upload-btn">
        <el-button style="margin-left: 10px;" type="warning" icon="el-icon-delete" @click="deleteSelectionAll">
          删除选择行
        </el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">>
      <el-table-column
        type="selection"
        width="50"
        align="center"
      />
      <el-table-column align="center" label="封面" min-width="10%">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="scope.row.imgPath" min-width="70" height="40" :onerror="errorUserPhoto">
        </template>
      </el-table-column>
      <el-table-column align="left" label="图片名称" min-width="25%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.ptitle }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="大小" min-width="10%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.psize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="8%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input" @blur="handleModifyIndex(row)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="上传时间" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.uptime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
import NewsImageUpload from '@/components/ImageUpload' // Secondary package based on el-pagination

import { fetchPhotoList, updatePhotoSindex, deletePhotosByPid } from '@/api/newsphotos' // 引入需要请求的路径

import { Message } from 'element-ui'
import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片

export default {
  name: 'StoriesImgList',
  components: { Pagination, NewsImageUpload },
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
        nid: this.$route.params.id,
        page: 1,
        limit: 10
      },
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
      fetchPhotoList(this.listQuery).then(response => {
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
      updatePhotoSindex(params).then(() => {
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(pids)
        deletePhotosByPid({ pids: pids }).then(response => {
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
  .editor-upload-btn {
    display: inline-block;
  }
</style>
