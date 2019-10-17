<template>
  <stories-form :is-edit="true" />
</template>

<script>
import StoriesForm from './components/NewsDetail'

export default {
  name: 'EditStories',
  components: { StoriesForm }
}
</script>
