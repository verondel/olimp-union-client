<template lang="html">
  <div>
    <h2>Статистика проекта {{ id }} </h2>
  </div>
</template>

<script>
export default {
  layout: 'olimp',
  computed: {
    id () {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="css" scoped>
</style>
