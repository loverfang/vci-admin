<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="120px">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          立即发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          存为草稿
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item label="页面标题">
          <el-col :span="11">
            <el-input v-model="postForm.ptitle" placeholder="页面标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="页面关键词">
          <el-col :span="11">
            <el-input v-model="postForm.pkeywords" placeholder="页面关键词" />
          </el-col>
        </el-form-item>
        <el-form-item label="页面描述">
          <el-input v-model="postForm.pdescription" type="textarea" :rows="2" placeholder="页面描述" />
        </el-form-item>
        <el-form-item label="供应商名字">
          <el-col :span="11">
            <el-input v-model="postForm.name" placeholder="供应商名字" />
          </el-col>
        </el-form-item>

        <el-form-item label="供应商类别" prop="cid">
          <el-select class="filter-item" v-model="postForm.cid">
            <el-option
              v-for="item in catoryOptions"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商网址" prop="title">
          <el-col :span="11">
            <el-input v-model="postForm.doman" placeholder="供应商网址" />
          </el-col>
        </el-form-item>
        <el-form-item label="供应商Logo">
          <el-upload
            class="avatar-uploader"
            action="/api/manage/uploadImage"
            :show-file-list="false"
            :on-success="handleCoverImgSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="postForm.coverImg" :src="postForm.coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="联系方式">
          <Tinymce ref="editor" v-model="postForm.info" :height="200" />
        </el-form-item>
        <el-form-item label="供应商简介">
          <Tinymce ref="editor" v-model="postForm.intro" :height="200" />
        </el-form-item>
        <el-form-item label="Company Introduction">
          <Tinymce ref="editor" v-model="postForm.introduction" :height="200" />
        </el-form-item>
        <el-form-item label="Solutions">
          <Tinymce ref="editor" v-model="postForm.solutions" :height="200" />
        </el-form-item>
        <el-form-item label="Highlights">
          <Tinymce ref="editor" v-model="postForm.highlights" :height="200" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky' // 粘性header组件

import { queryOptions } from '@/api/category'
import { fetchVendorInfo, createVendor, updateVendor, updateSindex, deleteVendor } from '@/api/vendor'
const defaultForm = {
  status: 'draft',
  ptitle: '', // 文章题目
  pkeywords: '', // 页面关键字
  pdescription: '', // 页面描述
  name: 'INSIGHTS', // 供应商名称
  coverImg: '', // 供应商Logo
  cid: '', // 供应商类别,下拉选择
  doman: '' // 供应商网址
}

export default {
  name: 'VendorForm',
  components: { Tinymce, Sticky },
  props: {
    isEdit: { type: Boolean, default: false }
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {},
      catoryOptions: []
    }
  },
  created() {
    this.fetchCatoryOptions()
    // debugger

    if (this.isEdit) {
      // alert('before--->' + this.$route.params && this.$route.params.id)
      const id = this.$route.params && this.$route.params.id
      // alert('after--->' + id)
      this.fetchData(id)
    } else {
      // 解决共用组件时获取不到路由参数的BUG
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        // alert(valid)
        if (valid) {
          this.loading = true
          const tempData = Object.assign({}, this.postForm)
          if (!this.isEdit) { // 不是编辑即添加
            createVendor(tempData).then(() => {
              this.$notify({
                title: '成功',
                message: '修改文章成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            updateVendor(tempData).then(() => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
            })
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      console.log('save Draft')
    },
    fetchData(nid) {
      fetchVendorInfo(nid).then(response => {
        // 将查询出来的只放入到表单中
        this.postForm = Object.assign({}, response.data)
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleCoverImgSuccess(res, file) {
      // 使用vue自带的预览功能
      // this.postForm.coverImg = URL.createObjectURL(file.raw)
      this.postForm.coverImg = res.data.serverPath
      // this.previewCoverImg = res.da.serverPathat
    },
    handleAuthorImgSuccess(res, file) {
      // 使用vue自带的预览功能
      // this.postForm.authorImg = URL.createObjectURL(file.raw)
      this.postForm.authorImg = res.data.serverPath
      // this.previewCoverImg = res.data.serverPath
    },
    beforeAvatarUpload(file) {
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
    fetchCatoryOptions() {
      queryOptions().then(response => {
        // 将查询出来的只放入到表单中
        // debugger
        this.catoryOptions = response.data
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
    }
    .createPost-main-container /deep/.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .createPost-main-container /deep/.avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .createPost-main-container /deep/.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 145px;
      height: 145px;
      line-height: 145px;
      text-align: center;
    }
    .createPost-main-container /deep/.avatar {
      width: 145px;
      height: 145px;
      display: block;
    }
    .createPost-main-container /deep/ .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }
  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
