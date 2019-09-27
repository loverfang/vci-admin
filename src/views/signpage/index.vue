<template>
  <div id="app-contner">
    <signle-article-detail :sign-type="signType"/>
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
