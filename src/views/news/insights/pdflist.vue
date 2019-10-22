<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
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
      <el-table-column align="center" label="封面" min-width="10%">
        <template slot-scope="scope">
          <img :src="scope.row.coverImg" min-width="70" height="40" :onerror="errorUserPhoto">
        </template>
      </el-table-column>
      <el-table-column align="left" label="文件名称" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="PDF描述" min-width="35%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.intor }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大小" min-width="8%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.psize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="8%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input" @blur="handleModifyIndex(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="下载次数" min-width="8%">
        <template slot-scope="scope">
          <span>{{ scope.row.downcount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="PDF文件" min-width="8%">
        <template slot-scope="scope">
          <span v-if="scope.row.pdfPath !== null">已上传</span>
          <span v-else>未上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="8%">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <!-- 添加编辑弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="12vh">
      <el-form ref="dataForm" :rules="rules" :model="postForm" label-position="left" label-width="120px" min-width="98%">
        <el-row :gutter="10" height="30px;">
          <el-col :span="12">
            <el-form-item label="PDF文件名" prop="name">
              <el-input v-model="postForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input v-model="postForm.intor" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="文件封面">
              <el-upload
                class="cover-uploader"
                action="/api/manage/uploadImage"
                :show-file-list="false"
                list-type="picture"
                :on-success="coverHandleSuccess"
                :before-upload="coverBeforeUpload"
              >
                <div slot="tip" class="el-upload__tip">请上传270 x360像素的图片,重新上传请点击图片!</div>
                <img v-if="postForm.coverImg" :src="postForm.coverImg" class="avatar">
                <i v-else class="el-icon-plus cover-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="PDF文件">
              <el-upload
                class="pdf-uploader"
                action="/api/manage/uploadFile"
                :on-success="pdfHandleSuccess"
                :limit="1"
                :on-exceed="pdfHandlerLimit"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传PDF文件,且不超过20M</div>
              </el-upload>
            </el-form-item>
          </el-col>
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
import { fetchList, savePdf, updatePdf, updateSindex, deletePdf } from '@/api/newspdf' // 引入需要请求的路径

import { Message } from 'element-ui'
import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片

export default {
  name: 'InsightsPdfList',
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
        id: this.$route.params && this.$route.params.id,
        source: 'news',
        page: 1,
        limit: 10
      },
      postForm: {
        pid: undefined,
        nid: '',
        source: 'news',
        name: '',
        pdfPath: '',
        pdfname: '',
        psize: '',
        intor: '',
        coverImg: ''
      },
      textMap: {
        update: '编辑文件信息',
        create: '添加新文件'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      errorUserPhoto: 'this.src="' + userPhoto + '"',
      multipleSelection: [], // 存放选中的数据
      fileList: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.postForm.nid = this.$route.params && this.$route.params.id
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
          savePdf(this.postForm).then(() => {
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
          updatePdf(tempData).then(() => {
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
    handleModifyIndex(row) {
      if (this.postForm.sindex !== row.sindex) {
        const params = { pid: row.pid, sindex: row.sindex }
        updateSindex(params).then(() => {
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.getList()
        })
      }
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
        deletePdf({ pids: pids, source: 'vendor' }).then(response => {
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
    },

    resetTemp() {
      this.postForm = {
        pid: undefined,
        nid: '',
        source: 'news',
        name: '',
        pdfPath: '',
        pdfname: '',
        psize: '',
        intor: '',
        coverImg: ''
      }
    },

    coverHandleSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.postForm.coverImg = res.data.serverPath
    },

    coverBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    pdfHandlerLimit(files, fileList) {
      this.$message({
        type: 'error',
        message: '请先删除原有文件,然后重新上传!'
      })
    },

    pdfHandleSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      file.name = res.data.fileName
      this.postForm.psize = res.data.fileSize
      this.postForm.pdfname = res.data.fileName
      this.postForm.pdfPath = res.data.serverPath
    }
  }
}
</script>

<style scoped>
  .sindex-input >>> input{
    width: 50%;
    text-align: center;
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
