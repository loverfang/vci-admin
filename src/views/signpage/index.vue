<template>
  <div id="app-contner">
    <signle-article-detail :is-edit="true" />
  </div>
</template>

<script>
import SignleArticleDetail from './components/ArticleDetail'
export default {
  name: 'SignArticleForm',
  props: ['signType'], // 路由上传递过来的参数
  components: { SignleArticleDetail }
}
</script>
