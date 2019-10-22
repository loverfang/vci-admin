<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="editor-upload-btn">
      <el-input class="filter-item"  v-model="listQuery.name" placeholder="File Name" style="width: 280px;" @keyup.enter.native="handleFilter" />
      </div>
      <div class="editor-upload-btn">
      <el-button class="filter-item" type="info" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      </div>
      <FilesUpload ref="fileUpload" :parentId="listQuery.fid" @successUploadCBK="getList" />
      <div class="editor-upload-btn">
        <el-button type="warning" icon="el-icon-delete" @click="deleteSelectionAll">
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
      <el-table-column align="left" label="文件名称" min-width="25%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="文件类型" min-width="5%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.extName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大小" min-width="10%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.psize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下载地址" min-width="30%">
        <template slot-scope="{row}">
          <span>http://vcintegration.com/download?fileId={{ row.fid}}</span>
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
import FilesUpload from '@/components/FilesUpload' // Secondary package based on el-pagination

import { fetchFileList, deleteVciFiles } from '@/api/vcifiles' // 引入需要请求的路径

import { Message } from 'element-ui'
import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片

export default {
  name: 'VciFilesList',
  components: { Pagination, FilesUpload },
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
        name: '',
        fid: this.$route.params.fid,
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
      fetchFileList(this.listQuery).then(response => {
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

      const fids = this.multipleSelection.map(item => item.fid).join() // 获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(fids)
        deleteVciFiles({ fids: fids }).then(response => {
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
  .sindex-input-address >>> input{
    width: 100%;
    text-align: center;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
