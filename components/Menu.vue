<template>
  <ul>
    <li>
      <NuxtLink to="/portfolio">
        Личная информация
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/portfolio/key-skill">
        Основное образование
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/portfolio/about">
        Дополнительное образование
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/portfolio/about">
        Ключевые навыки
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/portfolio/about">
        Профессиональные навыки
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/portfolio/about">
        Обо мне
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuPortfolio',
  mounted () {

  }
}

</script>
<style scoped>
  :root{
      --main-font: Helvetica, Arial, sans-serif;
  }
  ul li{
      list-style-type: none;
      padding:.2em 1.6em;
  }
  a{
      text-decoration: none;
      color: gray;
  }
  a:hover{
    color:black;
  }
  li:hover{
    border-left: 2px solid #3914af;
    font-weight: bold;
  }

</style>
