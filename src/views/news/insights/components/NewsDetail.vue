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
            <el-input v-model="postForm.ptitle" placeholder="页面标题"/>
          </el-col>
        </el-form-item>
        <el-form-item label="页面关键词">
          <el-col :span="11">
            <el-input v-model="postForm.pkeywords" placeholder="页面关键词"/>
          </el-col>
        </el-form-item>
        <el-form-item label="页面描述">
          <el-input v-model="postForm.pdescription" type="textarea" :rows="2" placeholder="页面描述"/>
        </el-form-item>
        <el-form-item label="所属栏目" prop="ntype">
          <el-select v-model="postForm.ntype">
            <el-option label="VCI Instghts" value="INSIGHTS" />
          </el-select>
        </el-form-item>
        <el-form-item label="栏目标签/类型">
          <el-col :span="11">
            <el-input v-model="postForm.nlable" placeholder="栏目标签/类型"/>
          </el-col>
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-col :span="11">
            <el-input v-model="postForm.title" placeholder="文章标题"/>
          </el-col>
        </el-form-item>
        <el-form-item label="作者">
          <el-col :span="11">
            <el-input v-model="postForm.author" placeholder="作者/来源"/>
          </el-col>
        </el-form-item>
        <el-form-item label="英文日期">
          <el-col :span="11">
            <el-input v-model="postForm.endate" placeholder="英文日期" />
          </el-col>
        </el-form-item>
        <el-form-item label="新闻封面">
          <el-upload
            class="avatar-uploader"
            action="/api/manage/uploadImage"
            :show-file-list="false"
            :on-success="handleCoverImgSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div slot="tip" class="el-upload__tip">请上传329 x 264像素的图片,重新上传请点击图片!</div>
            <img v-if="postForm.coverImg" :src="postForm.coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="作者头像">
          <el-upload
            class="avatar-uploader"
            action="/api/manage/uploadImage"
            :show-file-list="false"
            :on-success="handleAuthorImgSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="postForm.authorImg" :src="postForm.authorImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章摘要">
          <Tinymce ref="editor" v-model="postForm.ndigest" :height="200"/>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <Tinymce ref="editor" v-model="postForm.content" :height="400"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky' // 粘性header组件

import { fetchNewsDetail, createInsights, updateInsights } from '@/api/article'
const defaultForm = {
  status: 'draft',
  ptitle: '', // 文章题目
  pkeywords: '', // 页面关键字
  pdescription: '', // 页面描述
  ntype: 'INSIGHTS', // 文字类型
  nlable: '', // 类型标签
  title: '', // 标题
  author: '', // 作者
  endate: '', // 英文日期
  ndigest: '', // 新闻摘要
  content: '', // 文章内容
  coverImg: '', // 封面路径
  authorImg: '' // 作者头像
}

export default {
  name: 'InsightsForm',
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
      // previewCoverImg: '',
      // previewAuthorImg: '',
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    // 解决共用组件时获取不到路由参数的BUG
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const tempData = Object.assign({}, this.postForm)
          console.log('请求数据' + tempData)

          if (!this.isEdit) { // 不是编辑即添加
            createInsights(tempData).then(() => {
              this.$notify({
                title: '成功',
                message: '修改文章成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            updateInsights(tempData).then(() => {
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
      fetchNewsDetail(nid).then(response => {
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
