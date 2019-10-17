<template>
  <stories-form :is-edit="false" />
</template>

<script>
import StoriesForm from './components/NewsDetail'

export default {
  name: 'CreateStories',
  components: { StoriesForm }
}
</script>
