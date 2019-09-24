<template>
  <div id="app-contner">
    <article-detail :is-edit="true" />
  </div>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
export default {
  name: 'SignArticleForm',
  components: { ArticleDetail },
  props: [ 'signType' ],
  data() {
    return {
      pageName: '单页系统',
    }
  },
  created() {
    console.log('load over')
  }
}
</script>
