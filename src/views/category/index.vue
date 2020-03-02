<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.cname" placeholder="类型名称" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="info" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="类别名称" min-width="20%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别状态" align="center" min-width="15%">
        <template slot-scope="scope">
          <div v-if="scope.row.cstate === 'NORMAL'">
            <el-tag :type="scope.row.status | statusFilter">
              正常
            </el-tag>
          </div>
          <div v-else-if="scope.row.cstate === 'WAITCHECK'">
            <el-tag :type="scope.row.status | statusFilter">
              待审核
            </el-tag>
          </div>
          <div v-else>
            <el-tag :type="scope.row.cstate | statusFilter">
              已删除
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="排序索引" align="center" min-width="8%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input" @blur="handleModifyIndex(row)"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="left" min-width="35%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="20%" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.cstate !== 'LOCKED'" size="mini" type="danger" @click="handleModifyStatus(row,'LOCKED')">
            锁定
          </el-button>
          <el-button v-if="row.cstate !== 'NORMAL'" size="mini" type="success" @click="handleModifyStatus(row,'NORMAL')">
            解锁
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" min-width="98%">
        <el-form-item label="类别名称" prop="cname">
          <el-col :span="12">
          <el-input v-model="temp.cname" placeholder="请输入类别名称" />
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-col :span="24">
          <el-input v-model="temp.memo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注信息" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList, addCategory, updateCategory, updateStatus, updateSindex } from '@/api/category'

export default {
  name: 'CategoryList',
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
        page: 1,
        limit: 20
      },
      temp: {
        cid: undefined,
        pid: 1,
        cname: '',
        memo: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑类别',
        create: '新增类别'
      },
      rules: {
        cname: [{ required: true, message: '类别名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.items
        this.total = response.data.total
        // // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      const params = { cid: row.cid, cstate: status }
      updateStatus(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        row.cstate = status
      })
    },
    handleModifyIndex(row) {
      const params = { cid: row.cid, sindex: row.sindex }
      updateSindex(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.getList()
      })
    },
    resetTemp() {
      this.temp = {
        cid: undefined,
        pid: 1,
        cname: '',
        memo: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addCategory(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // 可以使用$nextTick获得更新后的dom。
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateCategory(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          })
        }
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
  .el-form >>> .el-form-item label:after {
    content: " ";
    display: inline-block;
    width: 100%;
  }

  .el-form >>> .el-form-item__label {
    text-align: justify;
    text-align:right;
    height: 40px;
  }

  .el-form >>> .el-form-item__content {
    text-align: justify;
    text-align:right;
    height: 40px;
  }
</style>
