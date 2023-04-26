<template lang="html">
  <v-card class="pa-10">
    <v-toolbar
      flat>
      <h2 class="primary--text font-weight-bold">Новый проект</h2>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
        >
          <v-tab
            v-for="n in CatEducation"
            :key="n"
          >{{ n }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-form ref="form"
          @submit.prevent="saveNew"
          v-model="valid"
          lazy-validation>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat class="pt-15">
          
            <v-row>
              <v-col cols="2"
                  sm="3" class="py-0 d-inline-block">
                  <v-card class="avatar" flat>
                    <img v-if="viewImage"
                      :src="viewImage"
                      max-height="128"
                      max-width="128">
                    <img v-else
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="128"
                      max-width="128">
                    <!-- <v-icon>mdi-image-outline</v-icon> -->
                  </v-card>
                  <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    v-model="project.href_avatar"
                    label="Выберете фото"/>
              </v-col>
              <v-col cols="7"
                  sm="8" class="py-0 d-inline-block">
                  <label for="name" class="primary--text font-weight-bold">Название</label>
                  <v-text-field id="name"
                      type="text"
                      v-model.trim="project.name"
                      class="rounded-lg pa-0 ma-0"
                      :rules="nameRules"
                      outlined
                      clearable
                      height="30px"
                      color="blue darken-2"
                      onchange="validate"
                      required></v-text-field>
                  <v-row>
                    <v-col cols="3" sm="4" @mouseover="showAbbreviat=true">
                      <label for="abbreviation" class="primary--text font-weight-bold">Аббревиатура</label>
                      <v-text-field id="abbreviation"
                              type="text"
                              v-model.trim="project.abbreviation"
                              class="rounded-lg pa-0 ma-0"
                              :rules="abbreviationRules"
                              outlined
                              clearable
                              height="30px"
                              color="blue darken-2"
                              onchange="validate"
                              required></v-text-field>
                      </v-col>
                      <transition name="fade">
                      <v-col cols="3" sm="4" v-show="showAbbreviat" class="py-10 align-self-center">
                        <div class="d-flex align-end">
                          <v-icon left inline>
                          mdi-lightbulb-on-10 
                        </v-icon>
                        Аббревиатура- это ..</div>
                      </v-col>
                      </transition>
                  </v-row>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="9" xs="12" class="py-0" @mouseover="">
                    <label for="keywords" class="primary--text font-weight-bold">Ключевые слова</label>
                    <v-text-field id="keywords"
                        type="text"
                        v-model.trim="project.keyWords"
                        class="rounded-lg pa-0 ma-0"
                        :rules="wordsRules"
                        outlined
                        clearable
                        color="blue darken-2"
                        onchange="validate"
                        height=30px
                        required></v-text-field>
                </v-col>
                <v-col cols="3" xs="10"   class="py-0 d-inline-block">
                  <label for="typeSelect" class="primary--text font-weight-bold">Категория</label>
                  <v-select
                    id="typeSelect"
                    :items="items"
                    item-text="name"
                    item-value="val"
                    height="30px"
                    v-model.trim="project.category"
                    class="rounded-lg pa-0 ma-0"
                    outlined></v-select>
                </v-col>
                <transition name="fade">
                  <v-col cols="3" sm="4" v-show="showWords" class="pb-3 pt-0">
                  <div class="d-flex align-end">
                    <v-icon left inline class="d-inline-block">
                    mdi-lightbulb-on-10 
                  </v-icon>
                    Ключевые слова - это ..</div>
                </v-col>
                </transition>
              </v-row>
              <v-row>
                <v-col cols="9" class="py-0" @mouseover="showDescrip=true">
                    <label for="description" class="primary--text font-weight-bold">Краткое описание проекта</label>
                    <v-textarea id="description"
                        v-model.trim="project.short_descr"
                        auto-grow
                        outlined
                        class="rounded-lg"
                        rows="5"
                        row-height="36"></v-textarea>
                </v-col>
                <transition name="fade">
                <v-col cols="3" v-show="showDescrip" class="py-10">
                    <div class="d-flex align-end">
                      <v-icon left inline>
                      mdi-lightbulb-on-10 
                    </v-icon>
                    Краткое описание проекта - это ..</div>
                </v-col>
                </transition>
            </v-row>
            <v-row class="justify-space-between">
              <v-col cols="3" class="py-0" @mouseover="showDescrip=true">
                  <label for="level" class="primary--text font-weight-bold">Уровень сложности</label>
              </v-col>
              <v-col cols="5">
                <div class="d-flex align-end">
                  <v-icon left inline>
                    mdi-lightbulb-on-10 
                  </v-icon>
                  Уровень сложности проекта определяется ...</div>
              </v-col>
              <v-col cols="4">
              <v-slider
                v-model="project.level"
                step="1"
                label="0"
                ticks
                max="7"
                min="0"
                thumb-label="always">
                <!-- <template v-slot:append> -->
                  <!-- <v-text-field
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                  >7</v-text-field> -->
                <!-- </template> -->
              </v-slider>
              <p>7</p>
              </v-col>
            </v-row>
            
              <v-textarea id="level"
                v-model.trim="project.level_descr"
                auto-grow
                outlined
                class="rounded-lg"
                rows="5"
                row-height="36"></v-textarea>
            
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="pt-15">
          <!-- <v-form ref="form1"
            v-model="valid"
            lazy-validation> -->
            <v-row>
              <v-col cols="5" @mouseover="showParentProject=true"
                  sm="6" class="py-0 d-inline-block">
                  <label for="parentPr" class="primary--text font-weight-bold">Родительски проект</label>
                  <v-text-field id="parentPr"
                      type="text"
                      v-model.trim="project.parentProject"
                      class="rounded-lg pa-0 ma-0"
                      outlined
                      :disabled="!project.parent"
                      clearable
                      height=30px
                      color="blue darken-2"></v-text-field>
              </v-col>
              <v-col cols="5" sm="4" v-show="showParentProject" class="py-auto align-self-center">
                    <div class="d-flex align-end">
                      <v-icon left>
                      mdi-lightbulb-on-10 
                    </v-icon>
                    Родительский проект- это ..</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" @mouseover="showTypeParent=true"
                  sm="6" class="py-0 d-inline-block">
                  <label for="typeParent" class="primary--text font-weight-bold">Тип наследования</label>
                  <v-text-field id="typeParent"
                      type="text"
                      v-model.trim="project.typeParent"
                      class="rounded-lg pa-0 ma-0"
                      outlined
                      :disabled="!project.parent"
                      clearable
                      height=30px
                      color="blue darken-2"
                      onchange="validate"></v-text-field>
                </v-col>
                <v-col cols="5" sm="4" v-show="showTypeParent" class="py-auto align-self-center">
                    <div class="d-flex align-end">
                      <v-icon left inline>
                      mdi-lightbulb-on-10 
                    </v-icon>
                    Тип наследования зависит от ..</div>
                </v-col> 
              </v-row>
              <v-row class="d-flex align-center mx-0 mb-5">
                  <v-checkbox
                    id="onYarmarka"
                    v-model="project.onYarmarka"
                    hide-details
                    class="shrink mt-0 pt-0"
                  ></v-checkbox>
                  <label for="onYarmarka" class="primary--text font-weight-bold">Опубликовать на ярмарке</label>
              </v-row>
              <v-row>
                <v-col cols="6" class="py-0 d-inline-block">
                  <label for="goalSelect" class="mr-3 d-inline-block">Цель публикации</label>
                  <v-select
                    id="goalSelect"
                    :items="goals"
                    dense
                    height=30px
                    v-model.trim="project.goal"
                    :disabled="!project.onYarmarka"
                    class="rounded-lg pa-0 ma-0 d-inline-block"
                    outlined></v-select>
                    <p class="primary--text font-weight-bold d-block">Ключевые характеристики проекта
                    <v-icon right inline  @mouseover="showInformation=true" @mouseleave="showInformation=false">
                      mdi-information-outline 
                    </v-icon>
                  </p>
                </v-col>
                  <transition name="fade">
                  <v-col cols="12" v-show="showInformation" class="pt-0">
                    <p>
                      <v-icon left>
                      mdi-lightbulb-on-10 
                      </v-icon>
                      Укажите характеристики, которые будут важны для человека, который найдет ваш проект</p>
                      
                  </v-col>
                   </transition>
            </v-row>
              
              <p v-if="project.onYarmarka">Укажите ключевые характеристики вашего проекта, не менее 3 шт. (Обязательно для публикации на ярмарке)</p>
             
              <p v-else>Укажите ключевые характеристики вашего проекта. (Не обязательно) 
                В случае, если Вы когда-нибудь захотите опубликовать свой проект на ярмарке - вам не придется делать это заново. Здорово же=)</p>
            <v-row v-for="param in project.params" :key="param.id">
              <v-col cols="4" class="py-0">
                  <v-text-field
                      type="text"
                      v-model.trim="param.name"
                      :label="param.label"
                      class="rounded-lg pa-0 ma-0"
                      outlined
                      clearable
                      height=30px
                      :required="project.onYarmarka"
                      color="blue darken-2"
                      onchange="validate"></v-text-field> 
              </v-col>
              <v-col cols="8" class="py-0">
                  <v-text-field
                      type="text"
                      v-model.trim="param.text"
                      :label="param.label2"
                      class="rounded-lg pa-0 ma-0"
                      outlined
                      clearable
                      height=30px
                      :required="project.onYarmarka"
                      color="blue darken-2"
                      onchange="validate"></v-text-field> 
                </v-col>
            </v-row>
            <v-btn 
                  text
                  @click="add_param"
                  class="d-block ml-0 my-5 px=0"
                  outlined
                  color="primary">Добавить еще характеристику +</v-btn> 
          <!-- </v-form> -->
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title class="text-h5">
            Настройки
          </v-card-title>
          <v-card-text>
            <p class="mb-0">
              Пользовательские настройки
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-row justify="end">
      <v-col col="1" xs="4">
        <v-btn type="submit"
          class="d-online-block rounded-lg elevation-2 mx-0 my-5 px=10"
          right
          dark color="#351BA9">Создать</v-btn>
      </v-col>
    </v-row>
    </v-form>
    
    <!-- eslint-disable -->
    
  </v-card> 
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      title: "",
      keywords: "",
      complexity: 4,
      desc_short: "",
      desc_full: "",
      href_avatar: "",
      nextStep: false,
      tabs: null,
      text: 'Lorem ipsum dolor',
      showAbbreviat: true,
      showDescrip: true,
      showWords: true,
      showParentProject: true,
      showTypeParent: true,
      showInformation: true,
      CatEducation: [
        'Основное', 
        'Дополнительное',
        'Настройки доступа'
      ],
      viewImage: '',
      project : {
                id_add: 0,
                name: "",
                abbreviation: "",
                keyWords: "",
                short_descr: "",
                category: '',
                href_avatar: "",
                parent: '',
                typeParent: '',
                parentProject: 'Оригинальный проект',
                onYarmarka: false,
                goal: 'Расказать о проекте',
                params: [
                  {
                    id: 0,
                    name: '',
                    text: '',
                    label: "Характеристика А",
                    label2: 'Значение А'
                  },
                  {
                    id: 1,
                    name: '',
                    text: '',
                    label: "Характеристика Б",
                    label2: 'Значение Б'
                  },
                  {
                    id: 2,
                    name: '',
                    text: '',
                    label: "Характеристика В",
                    label2: 'Значение В'
                  }
                ]
      },
      goals: [
        'Расказать о проекте',
        'Привлечь разработчиков в команду',
        'Найти инвесторов',
        'Найти покупателей/заказчиков',
        'Вклад в OpenSourse сообщество'
      ],
      nameRules: [
              v => !!v || 'Поле должно быть заполнено',
              // v => !v=='Название' || 'Поле должно быть заполнено',
              v => (v && v.length <= 80) || 'Название образования не может быть больше 100 символов',
      ],
      wordsRules: [
              v => !!v || 'Поле должно быть заполнено',
              // v => !v=='Название' || 'Поле должно быть заполнено',
              v => (v && v.length <= 100) || 'Ключевые слова не могут быть больше 100 символов',
      ],
      abbreviationRules: [
              v => !!v || 'Поле должно быть заполнено',
              v => (v && v.length <= 30) || 'Аббревиатура не может быть больше 30 символов',
      ],
      valid: true,
      alfavit: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М'],
      items: [ { name: 'Категория 1', val: 1 }, { name: 'Категория 2', val: 2 }, { name: 'Категория 3', val: 3 }],
      complexity_descr: ['Первый уровень сложности, справится человек из любой возрастной группы без специальной подотовки',
                         'Второй уровень сложности, возможно понадобится использовать знания в рамках школьной программы',
                         'Третий уровень сложности, возможно понадобится гуглить',
                         'Четвертый уровень сложности, возможно понадобится много гуглить',
                         'Пятый уровень сложности, возможно понадобится очень много гуглить',
                         'Шестой уровень сложности, возможно понадобится очень-очень много гуглить',
                         'Седьмой уровень сложности, возможно понадобится очень-очень-очень много гуглить и не факт что поможет',]
    };
  },
  methods: {
    validate () {
      this.$refs.form.validate();
    },
    saveNew() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        const newProject = {
          // id_project: Math.floor(Math.random() * 100000000),
          title: this.project.name,
          keywords: this.project.keyWords.split(",").map((item) => item.trim()),
          abbreviation: this.project.abbreviation,
          status: 1,
          desc_full: "",
          desc_short: this.project.short_descr,
          id_category: this.project.category,
          href_avatar: this.href_avatar,
          is_favorites: false,
          is_owner: true,
          name_rev: "MK I",
          dt_start: new Date(Date.now()).toISOString(),
          dt_end: '',
          last_changed: new Date(Date.now()).toISOString(),
          last_changed_author: "",
          last_changed_status: 1,
          actions: {},
          id_parent_project: 0,
          typeParent: this.project.typeParent,
          on_yarmarka: this.project.onYarmarka,
          goal: this.project.goal,
          params: this.project.params,
          tag: ""
        };        
        console.log(newProject);
        this.$store.dispatch("project/addNew", newProject);
        // console.log(this.projects);
      }
    },
    back() {
      this.$router.go(-1);
    },
    mouseOverAbb(){
      this.showAbbreviat = !this.showAbbreviat;
    },
    add_param(){
        let new_param = {
              id: this.project.params.length,
              name: '',
              text: '',
              label: `Характеристика ${this.alfavit[this.project.params.length]}`,
              label2: `Значение ${this.alfavit[this.project.params.length]}`
        };
        this.project.params.push(new_param);
    },
    
    // showInformation(){

    // }
  },
  computed: {
    ...mapGetters({
      projects: 'project/getProjects',
      favProjects: 'project/getFavProjects',
    })
  }
};
</script>

<style scoped>

.avatar {
  border: dashed 2px grey;
  border-radius: 10px;
  height: 200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
