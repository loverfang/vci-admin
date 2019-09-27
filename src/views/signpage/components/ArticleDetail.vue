<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          立即发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          存为草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 40px;" label-width="120px" label="页面标题:">
          <el-input v-model="postForm.ptitle" :rows="1" type="input" class="article-input" autosize placeholder="请输入页面标题" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="120px" label="关键词:">
          <el-input v-model="postForm.pkeywords" :rows="1" type="input" class="article-input" autosize placeholder="请输入页面关键词" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="120px" label="页面描述:">
          <el-input v-model="postForm.pdescription" :rows="10" type="textarea" class="article-textarea" autosize placeholder="请输入页面描述内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky' // 粘性header组件

import { fetchSingleArticle, updateArticle } from '@/api/article'
const defaultForm = {
  status: 'draft',
  ptitle: '', // 文章题目
  pkeywords: '', // 页面关键字
  pdescription: '', // 页面描述
  content: '', // 文章内容
  ntype: '' // 新闻类型
}

export default {
  name: 'SignleArticleDetail',
  components: { Tinymce, Sticky },
  props: {
    signType: {
      default: ''
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        ptitle: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.ptitle.length
    }
  },
  created() {
    if (this.signType) {
      this.fetchData(this.signType)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData(ntype) {
      fetchSingleArticle(ntype).then(response => {
        // 将查询出来的只放入到表单中
        this.postForm = Object.assign({}, response.data)
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          const tempData = Object.assign({}, this.postForm)
          updateArticle(tempData).then(() => {
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
          })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
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
    .word-counter {
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
