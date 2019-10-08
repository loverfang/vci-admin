<template>
  <vendor-form :is-edit="true" />
</template>

<script>
import VendorForm from './components/VendorDetail'

export default {
  name: 'EditVendor',
  components: { VendorForm }
}
</script>
