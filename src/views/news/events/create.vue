<template>
  <events-form :is-edit="false" />
</template>

<script>
import EventsForm from './components/NewsDetail'

export default {
  name: 'CreateEvents',
  components: { EventsForm }
}
</script>
