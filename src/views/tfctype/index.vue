<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="TFC类型名称" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="info" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="left" label="类型名称" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别状态" align="center" min-width="15%">
        <template slot-scope="scope">
          <div v-if="scope.row.tstate === 'NORMAL'">
            <el-tag :type="scope.row.tstate | statusFilter">
              正常
            </el-tag>
          </div>
          <div v-else-if="scope.row.tstate === 'WAITCHECK'">
            <el-tag :type="scope.row.tstate | statusFilter">
              待审核
            </el-tag>
          </div>
          <div v-else>
            <el-tag :type="scope.row.tstate | statusFilter">
              已删除
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="8%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input" @blur="handleModifyIndex(row)" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="left" min-width="35%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>

          <el-button v-if="row.tstate !== 'LOCKED'" size="mini" type="danger" @click="handleModifyStatus(row,'LOCKED')">
            锁定
          </el-button>
          <el-button v-if="row.tstate !== 'NORMAL'" size="mini" type="success" @click="handleModifyStatus(row,'NORMAL')">
            解锁
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>

    <!-- 添加编辑弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="postForm" label-position="left" label-width="120px" min-width="98%">
        <el-row :gutter="10" height="30px;">
          <el-col :span="15">
            <el-form-item label="类型名称" prop="typeName">
              <el-input v-model="postForm.typeName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" height="30px;">
          <el-form-item label="备注">
            <el-col :span="24">
              <el-input v-model="postForm.memo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注信息" />
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchTypeList, saveTfcType, updateTfcType, updateTfcTypeSindex, updateTfcTypeStatus } from '@/api/tfc.js' // 引入需要请求的路径

import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片

export default {
  name: 'TFCtypeList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        NORMAL: 'success',
        WAITCHECK: 'warning',
        LOCKED: 'warning'
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
        limit: 10
      },
      postForm: {
        vid: undefined,
        title: '',
        vurl: '',
        needcount: '1',
        memo: '',
        coverImg: ''
      },
      textMap: {
        update: '编辑类型信息',
        create: '添加新类型'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      userPhoto: userPhoto,
      errorUserPhoto: 'this.src="' + userPhoto + '"',
      multipleSelection: [], // 存放选中的数据
      fileList: [],
      rules: {
        typeName: [{ required: true, message: 'title is required', trigger: 'blur' }],
        vurl: [{ required: true, message: 'vurl is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchTypeList(this.listQuery).then(response => {
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
          saveTfcType(this.postForm).then(() => {
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
      this.postForm = Object.assign({}, row) // copy obj
      this.fileList = [{ url: row.pdfPath, name: row.pdfname }]
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.postForm)
          updateTfcType(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          })
        }
      })
    },

    handleModifyStatus(row, status) {
      const params = { typeId: row.typeId, tstate: status }
      updateTfcTypeStatus(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        row.tstate = status
      })
    },

    handleModifyIndex(row) {
      const params = { typeId: row.typeId, sindex: row.sindex }
      updateTfcTypeSindex(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.getList()
      })
    },

    resetTemp() {
      this.postForm = {
        vid: undefined,
        title: '',
        vurl: '',
        needcount: '1',
        memo: '',
        coverImg: ''
      }
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
    text-align:justify;
    text-align:right;
    height: 40px;
  }

  .cover-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 125px;
    height: 125px;
    line-height: 125px;
    text-align: center;
  }
  .avatar {
    width: 125px;
    height: 125px;
    display: block;
  }

</style>
