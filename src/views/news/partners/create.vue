<template>
  <insights-form :is-edit="false" />
</template>

<script>
import InsightsForm from './components/NewsDetail'

export default {
  name: 'CreateInsghts',
  components: { InsightsForm }
}
</script>
