<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      color="#3914AF"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-card
        class="d-flex justify-center mb-6 logo"
        color="#3914AF"
        flat
        tile
      >
        <v-img
          max-height="36"
          max-width="36"
          src="/logo.png"
          class="mb-5"
          alt="логотип ОЛИМП"
          position="center"
        />
      </v-card>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- @click.stop="rightDrawer = !rightDrawer" -->
      <!-- <span> {{  $auth.user.name + " " + $auth.user.surname }}</span> -->
     <!-- <v-btn  icon  @click="$auth.logout()"> -->
            <!-- <v-icon>mdi-logout</v-icon> -->
      <!-- </v-btn> -->

    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'Портфолио',
          to: '/portfolio',
          color: '#ffffff'
        },
        {
          icon: 'mdi-calendar',
          title: 'Расписание',
          to: '/schedule',
          color: '#ffffff'
        },
        {
          icon: 'mdi-hammer-screwdriver',
          title: 'Проекты',
          to: '/project',
          color: '#ffffff'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Сообщения',
          to: '/project',
          color: '#ffffff'
        },
        {
          icon: 'mdi-chart-bubble', 
          title: 'Каналы',
          to: '/channel',
          color: '#ffffff'
        }

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'εὕρηκα '
    }
  }
}
</script>

<style>
.logo {
  margin-top: 1em;
}
</style>
