<template>
  <div>
    <!-- <v-card
      style="overflow-y: auto; height:100vh"
      class="d-flex mb-4"
      color="grey lighten-2"
      flat
      height="100vh"
      loader-height="1"
      tile
    > -->
    <v-card

      class="pa-2"
      min-height="100vh"
      outlined
      tile
    >
      <v-list shaped>
        <!-- <v-subheader>REPORTS</v-subheader> -->
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <NuxtLink :to="item.route">
                <v-list-item-title v-text="item.text" />
              </NuxtLink>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- </v-card> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Личная информация', icon: 'mdi-account', route: '/portfolio/person' },
      { text: 'Основное образование', icon: 'mdi-school', route: '/portfolio/main' },
      { text: 'Дополнительное образование', icon: 'mdi-plus-thick', route: '/portfolio/add' },
      { text: 'Профессиональные навыки', icon: 'mdi-arm-flex-outline', route: '/portfolio/skill' },
      { text: 'Метанавыки', icon: 'mdi-head', route: '/portfolio/meta-skill' },
      { text: 'Ключевые навыки', icon: 'mdi-key', route: '/portfolio/key-skill' }

    ]
  })
}
</script>

<style>
.v-navigation-drawer__content  .v-list-item__content {
    color: white;
}
</style>
