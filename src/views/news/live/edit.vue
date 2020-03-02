<template>
  <live-form :is-edit="true" />
</template>

<script>
import LiveForm from './components/NewsDetail'

export default {
  name: 'EditLive',
  components: { LiveForm }
}
</script>
