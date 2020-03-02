<template>
  <live-form :is-edit="false" />
</template>

<script>
import LiveForm from './components/NewsDetail'

export default {
  name: 'CreateLive',
  components: { LiveForm }
}
</script>
