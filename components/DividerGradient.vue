<template>
  <v-card flat height="4px"
    class="gradient">
  </v-card>
</template>

<script>
export default {
  name: 'DividerGradient',
  data(){
    return {
        colors: ['red', 'orange', 'yellow']
    }
  },
//   props: {
    // hieght: {
    //   type: string,
    //   required: true
    // },
    // width: {
    //   type: string,
    //   required: false
    // }
//   },
  mounted () {

  }
}

</script>
<style scoped>
  .gradient {
    background: linear-gradient(180deg, #DFD1FA 0%, rgba(201, 186, 248, 0.14) 71.87%, rgba(196, 196, 196, 0) 100%);
  }
</style>