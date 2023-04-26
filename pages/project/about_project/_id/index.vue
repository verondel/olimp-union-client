<template lang="html">
  <div class="summary pa-4">
    <v-row class="ml-0 mr-2 mt-4 mb-0 d-flex align-center flex-nowrap overdflow-hidden">
      <v-col cols="6" class="white rounded-lg pa-3 align-self-center  mr-2 py-2">
        <h3 height="48px" class="primary--text">{{ project.title }}</h3>
      </v-col>
      <v-col cols="6" class="d-flex white rounded-lg align-center justify-space-between py-0 pt">
        <span @click="showFilters" class="px-2"> Фильтры </span>
        <span @click="sorting" class="mr-auto px-2"> Сортировка </span>
        <v-form class="pb-1 pt-1 flex-grow-1">
          <v-text-field id="poisktext"
            type="text"
            v-model.trim="poisktext"
            class="rounded-lg px-1"
            outlined
            clearable
            dense
            label="Что вы хотите найти?"
            color="blue darken-2"
            hide-details="auto"
            prepend-inner-icon="mdi-magnify">
          </v-text-field>
        </v-form>
        <v-btn type="submit" outlined color="#351BA9" rounded-xl
          class="ma-1 d-block text-decoration-none font-weight-bold" @click="openSettings">
          <v-icon left inline class="mx-auto">mdi-cog-outline</v-icon>
        </v-btn>
        <v-btn type="submit" outlined color="#351BA9" rounded-xl
          class="ma-1 d-block text-decoration-none font-weight-bold" @click="openSettings">
          <v-icon left inline class="mx-auto">mdi-information-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card flat class="mb-12 mt-2 px-0 summary">
      <v-tabs
        color="deep-purple accent-4">
        <v-tab
          v-for="cat in сategories"
          :key="cat" class="primary--text mt-3 white-back">{{ cat }}
        </v-tab>  
        <v-tab-item class="mt-2  summary">
          <v-row class="mr-1 mt-2 mb-2">
            <v-col cols="12" xs="6" class="mb-1 mt-0 ml-2 mr-2 pa-0 d-flex justify-space-between">
              <v-card flat height="240" width="254" class="rounded-lg pa-2  mx-1">
                <div class="backPurple d-flex align-center justify-center">
                  <img v-if="project.href_avatar" :src="project.href_avatar" :alt="project.id_project" height="160" class="rounded-lg photo-cover"/>
                  <v-icon v-else left inline color="#351BA9">mdi-progress-camera</v-icon>
                </div>
                <v-row>
                  <v-col cols="7" class="pb-0 pt-5">
                    <span v-if="project.status === 1" class>В разработке</span>
                    <span v-else-if="project.status === 2">Приостановлен</span>
                    <span v-else-if="project.status === 3">Завершен</span>
                  </v-col>
                  <v-col cols="5" class="d-flex align-center pb-0 pt-5">
                    <!-- <div class="d-inline-block mr-3">Сложность: </div> -->
                    <div v-for="n in project.level" :key="n" class="bar d-inline-block"></div>
                    <div v-for="n in (7-project.level)" :key="n" class="bar viewColor d-inline-block"></div>
                  </v-col>
                  <v-col  cols="12" class="pt-1">
                    {{ lastChanged }}
                    - {{ date_today }}
                  </v-col>
                </v-row>
              </v-card>
              <CardSummaryVue v-for="card in cards" :key="card.title" :field="card" class="mx-1"/>
              <CardSummaryVue :field="arrKeywords" :keywords="true" class="mx-1"/>
            </v-col>
          </v-row>

          <div class="mt-0 white-back rounded-lg pa-3 overflow-hidden">
            <h3 class="primary--text pb-2 pt-1">{{project.desc_full}}</h3>
            <div class="height-hide">{{anyText}}</div>
          </div>
          <div class="mt-2 white-back rounded-lg pa-3">
            <h3 class="primary--text pb-2 pt-1">Ключевые характеристики</h3>
            <div class="height-hide">
              <div v-for="feature in project.key_features" :key="feature.name" class="py-2">{{feature.name}}: {{feature.value}}</div>
            </div>
          </div>

          <div class="mt-2 white-back rounded-lg pa-3">
            <div class="py-0 mb-3 d-inline-block">
              <label for="goalSelect" class="primary--text mr-3 d-inline-block font-weight-bold">Вехи проекта</label>
              <v-select id="goalSelect"
                :items="milestones"
                dense
                height=30px
                v-model.trim="milestoneShow"
                hide-details="auto"
                class="rounded-lg pa-0 ma-0 d-inline-block"
                outlined></v-select>
            </div>
            <DividerGradient width="100%"/>
            <div class="overflow-div mb-4 pl-3">
              <div v-for="part in partsOfMilestone" :key="part.date" class="py-5">
                <div class="d-flex align-center">
                  <v-icon left inline :color="part.color">mdi-progress-star</v-icon>
                  <div class="d-inline-block">
                    <div :class="`${part.color}--text`">{{part.title}}</div>
                    <div>{{part.date}}</div>
                  </div>
                </div>
                <div>{{part.text}}</div>
              </div>
            </div>
          </div>
          
          <div class="mt-2 white-back rounded-lg pa-3">
            <h3 class="primary--text pb-2 pt-1">Инструкции</h3>
            <DividerGradient width="100%"/>
            <v-card flat class="grey--text overflow-div py-5"> <p>Здесь будут инструкции проекта</p></v-card>
          </div>

          <div class="mt-2 white-back rounded-lg pa-3">
            <h3 class="primary--text pb-2 pt-1">Задачи</h3>
            <DividerGradient width="100%"/>
            <v-card flat  class="grey--text overflow-div py-5"> <p>Здесь будут текущие задачи по проекту</p>
            </v-card>
          </div>
          <!-- <h3 class="primary--text py-3">Модификации проекта</h3> -->
    
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="pt-10 px-3 d-flex" height="100vh">
            <div>{{anyText}}</div>
            <!-- <p>это документ с планом развития проекта. Он включает главные цели и задачи, список исполнителей, основные шаги и дает четкое видение, чего нужно достичь и что для этого необходимо предпринять.</p> -->
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="pt-10  px-3 d-flex" height="100vh">
            <v-card-title class="text-h5">
            </v-card-title>
            <v-card-text>
              <div v-for="feature in project.key_features" :key="feature.name" class="py-2">{{feature.name}}: {{feature.value}}</div>
              <p class="mb-0">{{anyText}}</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="pt-10 px-3" height="100vh">
            <div v-for="part in partsOfMilestone" :key="part.date" class="py-5">
              <div class="d-flex align-center">
                <v-icon left inline :color="part.color">mdi-progress-star</v-icon>
                <div class="d-inline-block">
                  <div :class="`${part.color}--text`">{{part.title}}</div>
                  <div>{{part.date}}</div>
                </div>
              </div>
              <div>{{part.text}}</div>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="pt-10 px-3" height="100vh">
            <p>Здесь будут инструкции проекта</p>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="pt-10 px-3" height="100vh">
            <p>Здесь будут текущие задачи по проекту</p>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
        
      <!-- </v-col>
    </v-row> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardSummaryVue from '../../../../components/CardSummary.vue'
import DividerGradient from '../../../../components/DividerGradient.vue'
export default {
  components: {
    CardSummaryVue, 
    DividerGradient
  },
  data () {
    return {
      complexity: 3,
      poisktext: '',
      сategories: ['Визитка', 'Описание','Ключевые характеристики','Вехи проекта','Инструкция','Задачи'],
      cards: [
        {
          title: 'Команда проекта',
          list: [
            {
              name: 'Бордов Кирилл',
              route: '#' ,
              icon: 'mdi-account-star'
            },
            {
              name: 'Заблоцкая Светлана',
              route: '3',
              icon: 'mdi-account-outline'
            }
          ]
        },
        {
          title: 'Доступные файлы',
          list: [
            {
              name: '3D-модели',
              route: '#',
              href: "/olimp.jpg",
            },
            {
              name: 'Фотографии',
              route: '#',
              href: "/olimp.jpg",
            },
            {
              name: 'Чертежи',
              route: '#',
              href: "/v.png",
            }
          ]
        },
        {
          title: 'Ресурсы проекта',
          list: [
            {
              name: 'Miro.com',
              route: '#' 
            },
            {
              name: 'Google.com',
              route: '#'
            },
            {
              name: 'GitHub,com',
              route: '#'
            }
          ]
        },
        {
          title: 'Сторонние ресурсы',
          list: [
            {
              name: 'HackaDay.io',
              route: '#' 
            },
            {
              name: 'Thingiverse.com',
              route: '#'
            },
            {
              name: 'GitHub,com',
              route: '#'
            }
          ]
        },
      ],
      milestones: ['Все разделы','Разработка','Опытный образец'],
      milestoneShow: 'Все разделы',
      anyText: 'Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum. Eu aenean mattis purus rhoncus morbi eu consequat. Consequat tristique convallis et pharetra pretium sed duis. Nascetur sit pulvinar vitae, viverra vel bibendum ut. Quis varius integer nulla neque. Eu iaculis velit habitant molestie elementum amet et turpis. Consequat eu semper pellentesque viverra lacinia mauris. Pellentesque sed egestas vivamus imperdiet tempor. Felis, pharetra vitae, ultrices orci. Mauris cras elit ipsum commodo sollicitudin nunc, orci. Tincidunt bibendum elit velit nec, porttitor massa. Bibendum vitae, eu varius cras auctor. Dui ornare feugiat euismod gravida. In ipsum praesent duis accumsan molestie vestibulum consectetur. Massa sagittis, dui faucibus tincidunt diam et commodo. Sed felis magnis diam sem egestas neque. Amet, tincidunt id convallis purus fermentum nunc ut cursus. Purus vehicula hendrerit in faucibus ultricies nec sed nisl. Arcu quam viverra nibh amet enim, ultricies egestas amet cursus.',
      partsOfMilestone: [
        {color: "redApp", title: 'Конструирование', date: '25.02.21', text: 'Основная идея 3D-принтера – такая же, как и у картезианского робота. Это машина, которая может двигаться линейно в трех измерениях – по осям X, Y и Z, так же известные как картезианские координаты. Чтобы это делать, 3D-принтеры имеют небольшие шаговые двигатели, которые могут двигаться с высокими точностью и аккуратностью – обычно на 1,8 градуса на шаг.'},
        {color: "greenApp", title: 'Схемотехника', date: '08.03.21', text: 'Основная идея 3D-принтера – такая же, как и у картезианского робота. Это машина, которая может двигаться линейно в трех измерениях – по осям X, Y и Z, так же известные как картезианские координаты. Чтобы это делать, 3D-принтеры имеют небольшие шаговые двигатели, которые могут двигаться с высокими точностью и аккуратностью – обычно на 1,8 градуса на шаг.'},
        {color: "blue", title: 'Схемотехника1', date: '09.03.21', text: 'Основная идея 3D-принтера – такая же, как и у картезианского робота. Это машина, которая может двигаться линейно в трех измерениях – по осям X, Y и Z, так же известные как картезианские координаты. Чтобы это делать, 3D-принтеры имеют небольшие шаговые двигатели, которые могут двигаться с высокими точностью и аккуратностью – обычно на 1,8 градуса на шаг.'},
        {color: "grey", title: 'Схемотехника2', date: '10.03.21', text: 'Основная идея 3D-принтера – такая же, как и у картезианского робота. Это машина, которая может двигаться линейно в трех измерениях – по осям X, Y и Z, так же известные как картезианские координаты. Чтобы это делать, 3D-принтеры имеют небольшие шаговые двигатели, которые могут двигаться с высокими точностью и аккуратностью – обычно на 1,8 градуса на шаг.'},
      ] 
    }
  },
  // layout: 'olimp',
  computed: {
    ...mapGetters({ projects: 'project/getProjects' }),
    project () {
      return this.projects.find(a => a.id_project.toString() === this.$route.params.id)
    },
    date_start () {
      return new Date(this.project.dt_start)
    },
    date_today() {
      let today = new Date();
      let dateNow = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
      return dateNow;
    },
    lastChanged () {
      let d = new Date(this.project.last_changed);
      let date = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
      return date;
    },
    arrKeywords() {
      let arr = [];
      this.project.keywords.forEach(el => {
        arr.push({name: el, route: '#'});
      });
      return { title: 'Ключевые слова', list: arr};
    }
  },
  methods: {
    showFilters() {
    },
    sorting() {
    },
    openSettings() {
    },
    async fetch ({ store, from }) {
      if (from.name !== 'project') {
        await store.dispatch('project/loadData')
      }
    }
  }
  
}
</script>

<style lang="css">
.imgPlaceholder {
  width: 213px;
  height: 213px;
  border: 1px solid #B9B9EF;
  border-radius: 8px;
}
.bar {
  width: 8px;
  height: 16px;
  border-radius: 2px;
  background: #502DE2;
  margin: 1px;
}
.overflow-div {
  max-height: 350px;
  overflow-y: scroll;
  scrollbar-color: #ffff #B9B9EF;
  scrollbar-width: thin;
}
.overflow-div::-webkit-scrollbar {
  width: 5px;
  padding: 5px;
  border-radius: 10px;
  }

			  /* Track */
.overflow-div::-webkit-scrollbar-track {
  /* background: #edf1f5; */
  border-radius: 10px;
  }

			  /* Handle */
.overflow-div::-webkit-scrollbar-thumb {
  background: #B9B9EF;
  border-radius: 10px;
  }
.bottom-border {
  border-bottom: 1px solid;
  border-color:  #3914AF !important;
}
.card-border {
  border: 1px solid;
  border-color:  #B9B9EF !important;
  }
.summary {
  background-color: #E5E5E5;
}
.white-back {
  background-color: #FFFFFF;
}
.height-hide {
   max-height: 145px;
   word-wrap: break-word;
}
.photo-cover {
  width: auto;
  object-fit: cover;
}

</style>
