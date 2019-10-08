<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频名称" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="info" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
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
      <el-table-column align="center" label="预览" min-width="10%">
        <template slot-scope="scope">
          <img v-if="scope.row.coverImg !== null" :src="scope.row.coverImg" min-width="70" height="40" :onerror="errorUserPhoto">
          <img v-if="scope.row.coverImg === null" :src="userPhoto" min-width="70" height="40">
        </template>
      </el-table-column>
      <el-table-column align="left" label="视频标题" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="播放链接" min-width="35%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.vurl }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所需场次数" min-width="10%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.needcount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序索引" min-width="10%">
        <template slot-scope="{row}">
          <el-input v-model="row.sindex" size="small" class="sindex-input" @blur="handleModifyIndex(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" min-width="10%">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
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
            <el-form-item label="视频名称" prop="title">
              <el-input v-model="postForm.title" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" height="30px;">
          <el-col :span="15">
            <el-form-item label="播放地址" prop="vurl">
              <el-input v-model="postForm.vurl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" height="30px;">
          <el-col :span="15">
            <el-form-item label="所需次数" prop="needcount">
              <el-input v-model="postForm.needcount"  v-only-number="{max:10000,min:0,precision:0}"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="15">
            <el-form-item label="视频封面图">
              <el-upload
                class="cover-uploader"
                action="api/manage/uploadImage"
                :show-file-list="false"
                list-type="picture"
                :on-success="coverHandleSuccess"
                :before-upload="coverBeforeUpload"
              >
                <div slot="tip" class="el-upload__tip">上传成功后,点击图片重新上传</div>
                <img v-if="postForm.coverImg" :src="postForm.coverImg" class="avatar">
                <i v-else class="el-icon-plus cover-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" height="30px;">
          <el-col :span="24">
            <el-form-item label="视频简介" prop="memo">
              <Tinymce ref="editor" v-model="postForm.memo" :height="120"/>
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
import Tinymce from '@/components/Tinymce'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList, saveVideo, updateVideo, updateVideoSindex, deleteVideo } from '@/api/videos' // 引入需要请求的路径

import { Message } from 'element-ui'
import userPhoto from '@/assets/default_images/default.jpg' // 设置加载失败后的默认图片

const defaultForm = {
  vid: undefined,
  title: '',
  vurl: '',
  needcount: '1',
  memo: '',
  coverImg: ''
}

export default {
  name: 'VendorPdfList',
  components: { Pagination, Tinymce },
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
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      postForm: Object.assign({}, defaultForm),
      textMap: {
        update: '编辑文件信息',
        create: '添加新文件'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      userPhoto: userPhoto,
      errorUserPhoto: 'this.src="' + userPhoto + '"',
      multipleSelection: [], // 存放选中的数据
      fileList: [],
      rules: {
        name: [{ validator: validateRequire }]
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
          saveVideo(this.postForm).then(() => {
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
          updateVideo(tempData).then(() => {
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
      const params = { vid: row.vid, sindex: row.sindex }
      updateVideoSindex(params).then(() => {
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
      const vids = this.multipleSelection.map(item => item.vid).join() // 获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vids)
        deleteVideo({ vids: vids }).then(response => {
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
      this.defaultForm = {
        vid: undefined,
        title: '',
        vurl: '',
        needcount: '1',
        memo: '',
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
