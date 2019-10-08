<template>
  <vendor-form :is-edit="false" />
</template>

<script>
import VendorForm from './components/VendorDetail'

export default {
  name: 'CreateVender',
  components: { VendorForm }
}
</script>
