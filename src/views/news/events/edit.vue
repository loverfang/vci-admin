<template>
  <events-form :is-edit="true" />
</template>

<script>
import EventsForm from './components/NewsDetail'

export default {
  name: 'EditEvents',
  components: { EventsForm }
}
</script>
