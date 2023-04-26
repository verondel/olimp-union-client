<template>
  <v-card flat height="240" width="254" class="rounded-lg">
    <div class="d-flex justify-center align-item-center">
      <h4 class="primary--text py-3 pr-2 d-inline-block">{{field.title}}</h4>
      <v-icon inline right small color="#351BA9">mdi-folder-multiple-outline</v-icon>
    </div>
    <div class="pa-4 overflow-card">
      <div v-for="one in field.list" :key="one.name" class="pb-1"  :style="styleKeywords">
        <v-img v-if="one.href" :src="one.href" max-height="25" max-width="25" class="rounded-lg d-inline-block"></v-img>
        <v-icon v-if="one.icon" left  small inline color="#351BA9">{{one.icon}}</v-icon>
        <a :href="one.route" :style="styleObj"
          class="text-decoration-none primary--text pa-1">{{one.name}}</a>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'CardSummaryVue',
  data() {
    return {
      
    }
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    keywords: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    styleObj() {
      if (this.keywords) {
        return {
          border: '1px solid #DBDBF9',
          padding: '4px 8px !important',
          margin: '3px',
          display: 'inline-block!important',
          'flex-direction': 'row',
          'align-items': 'center',
          'border-radius': '4px',
        }
      } else {
        return '';
      }
    },
    styleKeywords() {
      if (this.keywords) {
        return {display: 'inline-block'}
      } else {
        return '';
      }
    }
  },
  mounted () {

  }
}

</script>
<style scoped>
  .card-border {
  border: 1px solid;
  border-color:  #B9B9EF !important;
  }
  a:hover{
    color:black;
  }
  .overflow-card {
    max-height: 190px;
    overflow-y: scroll;
    scrollbar-color: #ffff #B9B9EF;
    scrollbar-width: thin;
  }
  .overflow-card::-webkit-scrollbar {
    width: 5px;
    padding: 5px;
    border-radius: 10px;
    }

          /* Track */
  .overflow-card::-webkit-scrollbar-track {
    /* background: #edf1f5; */
    border-radius: 10px;
    }

          /* Handle */
  .overflow-card::-webkit-scrollbar-thumb {
    background: #B9B9EF;
    border-radius: 10px;
    }
</style>
