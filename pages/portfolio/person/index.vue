<template>
  <section>
    <v-row>
    <v-col class="sidebar-portfolio"
      md="3">
      <MenuPortfolio/>
    </v-col>
    </v-row>
    <v-col md-9 pa-0 color='whitesmoke'>
    </v-col>

  </section>
</template>
<script>
import MenuPortfolio from '~/components/portfolio/MenuPortfolio.vue'

export default {
    components: {MenuPortfolio},
    data(){
      return {
            user: ''
      }
    }
}
</script>