<template>
  <div class="app-container">dfsdfds</div>
</template>
<script>
export default {
  name: 'Banner',
  data() {
    return {
      title: ''
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('init')
      this.title = 'Fk'
    }
  },
  computed: {},
  components: {}
}
</script>
<style></style>
