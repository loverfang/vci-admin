<template>
  <partners-form :is-edit="true" />
</template>

<script>
import PartnersForm from './components/NewsDetail'

export default {
  name: 'EditPartners',
  components: { PartnersForm }
}
</script>
