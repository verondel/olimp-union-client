<template>
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Лайут</title>
    </head>
    <body>
      <aside class="aside">
        <span class="title">
          OLIMP.union
        </span>
        <!-- @click.native='handlers'  -->
        <div class="site-nav">
          <nuxt-link v-for="item of menu" :key="item.href" :to="`${item.href}`">
            {{ item.name }}
          </nuxt-link>
        </div>
        <Nuxt name="top" />
      </aside>

      <header class="header">
        <div class="avatar">
          <img width="30px" src="/avatar.png" alt="">
        </div>
        <div class="fio">
          <span class="content-navigation">{{ fio.name }} {{ fio.suname }} </span>
        </div>
      </header>
      <main class="main">
        <Nuxt />
      </main>
    </body>
  </html>
</template>

<script>

export default {
  data () {
    return {
      menu: [{ href: '/portfolio', name: 'Портфолио' }, { href: '/project', name: 'Проекты' }, { href: 'timetable', name: 'Расписание' }, { href: 'workbook', name: 'Журнал' }, { href: 'doc', name: 'Документация' }, { href: 'settings', name: 'Настройки' }],
      fio: { name: 'Виталий', suname: 'Чертков' }
    }
  },
  handler: () => {}
}
</script>

<style>
body {
    margin:0;
}
html,body {
   height: 100%;
}

</style>
