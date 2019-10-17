<template>
  <partners-form :is-edit="false" />
</template>

<script>
import PartnersForm from './components/NewsDetail'

export default {
  name: 'CreatePartners',
  components: { PartnersForm }
}
</script>
