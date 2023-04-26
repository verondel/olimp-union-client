<template>
  <div class="layout-new d-flex justify-center align-center">
  <!-- <v-card flat height="200" width="220" class="card-border rounded-lg"> -->
  <v-card width="82%" class="card px-15 py-7">
    <v-toolbar class="px-0"
      flat>
      <v-row >
        <v-col cols="12" class="d-flex justify-space-between align-center px-0">
        <h2 class="primary--text font-weight-bold">Новый проект</h2>
        <v-btn plain large class=" d-flex justify-end align-center mb-4 px-2" color="primary" @click="closeView" min-width="38px">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        </v-col>
      </v-row>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs">
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
                class="py-0 d-inline-block">
              <v-card class="avatar d-flex justify-center align-center" flat>
                <v-img
                  :src="avatar"
                  max-height="145"
                  max-width="145">
                </v-img>
                <!-- <v-icon>mdi-image-outline</v-icon> -->
              </v-card>
              <v-file-input
                @change="uploadImage"
                @click:clear="handlerClearableIcon"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                v-model="project.href_avatar"
                label="Выберете фото"/>
              </v-col>
              <v-col cols="8"
                  sm="8" class="py-0 d-inline-block">
                  <label for="name" class="primary--text font-weight-bold">Название</label>
                  <v-text-field id="name"
                    type="text"
                    v-model.trim="project.title"
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
                <v-col cols="9" class="py-0" @mouseover="showDescrip=true">
                    <label for="description" class="primary--text font-weight-bold">Описание проекта</label>
                    <v-textarea id="description"
                        v-model.trim="project.desc_full"
                        auto-grow
                        outlined
                        class="rounded-lg"
                        rows="3"
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
            <v-row>
              <v-col cols="2" class="py-0 d-flex align-center" @mouseover="showDescrip=true" >
                <label for="level" class="primary--text font-weight-bold">Уровень сложности</label>
              </v-col>
              <v-col cols="5" class="d-flex align-center">
                <div class="d-flex align-end">
                  <v-icon left inline>
                    mdi-lightbulb-on-10 
                  </v-icon>
                  Уровень сложности проекта определяется ...</div>
              </v-col>
              <v-col cols="5" class="d-dlex justify-end align-center mt-3">
                <v-slider
                  v-model="project.level"
                  step="1"
                  label="0"
                  ticks
                  max="7"
                  min="0"
                  thumb-label="always">
                  <template v-slot:append>
                    <p>7</p>
                    <!-- <v-text-field
                      class="mt-0 pt-0"
                      type="number"
                      style="width: 60px"
                    >7</v-text-field> -->
                  </template>
                </v-slider>
              </v-col>
            </v-row>
            
              <v-textarea id="level"
                v-model.trim="project.level_desc"
                auto-grow
                outlined
                class="rounded-lg"
                rows="3"
                row-height="36"></v-textarea>
              <v-row>
                <v-col cols="12" class="py-0">
                  <label for="keywords" class="primary--text font-weight-bold">Ключевые слова</label>
                  <v-text-field id="keywords"
                    type="text"
                    v-model.trim="project.keywords"
                    class="rounded-lg pa-0 ma-0"
                    :rules="wordsRules"
                    outlined
                    chips
                    clearable
                    color="blue darken-2"
                    onchange="validate"
                    height=30px
                    required></v-text-field>
                </v-col>
                <!-- <v-col cols="3" xs="10"   class="py-0 d-inline-block">
                  <label for="typeSelect" class="primary--text font-weight-bold">Категория</label>
                  <v-select
                    id="typeSelect"
                    :items="items"
                    height="30px"
                    v-model.trim="project.category"
                    class="rounded-lg pa-0 ma-0"
                    outlined></v-select>
                </v-col> -->
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
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="project.cat_tree"
                    :items="allSections.name"
                    outlined
                    dense
                    label="Разделы"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
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
                      v-model.trim="project.id_parent_project"
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
                    v-model="project.on_yarmarka"
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
                    :disabled="!project.on_yarmarka"
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
  </div>
</template>

<script>
const path = require('path');
export default {
  data() {
    return {
      // card: {
      //   border: '1px solid #3914AF',
      //   'border-radius': '12px',
      //   margin: '40px',
      // },
      avatar: '',
      close: false,
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
                title: "",
                abbreviation: "",
                keywords: "",
                desc_short: "",
                id_category: '',
                href_avatar: "",
                parent: '',
                typeParent: '-',
                id_parent_project: 'Оригинальный проект',
                on_yarmarka: false,
                goal: 'Расказать о проекте',
                level: '',
                level_desc: '',
                // key_features: '',
                cat_tree: [],
                tag: '',
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
      newPr: {
                id_add: 0,
                title: "",
                abbreviation: "",
                keywords: "",
                desc_short: "",
                id_category: '',
                href_avatar: "",
                parent: '',
                typeParent: '-',
                id_parent_project: 'Оригинальный проект',
                on_yarmarka: false,
                goal: 'Расказать о проекте',
                level: '',
                level_desc: '',
                // key_features: '',
                cat_tree: [],
                tag: '',
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
      items: ['Категория 1','Категория 2','Категория 3'],
      complexity_descr: ['Первый уровень сложности, справится человек из любой возрастной группы без специальной подотовки',
                         'Второй уровень сложности, возможно понадобится использовать знания в рамках школьной программы',
                         'Третий уровень сложности, возможно понадобится гуглить',
                         'Четвертый уровень сложности, возможно понадобится много гуглить',
                         'Пятый уровень сложности, возможно понадобится очень много гуглить',
                         'Шестой уровень сложности, возможно понадобится очень-очень много гуглить',
                         'Седьмой уровень сложности, возможно понадобится очень-очень-очень много гуглить и не факт что поможет',],
      allSections: {
          name:['Конструирование','Схемотехника','Программирование','Менеджмент',],
          color: ['#FF5F5F', '#3DD639', '#5FA8FF', '#FFA031']
          },
    };
  },
  props: {
    parentProject: {
      type: Object,
      required: false
    },
    mode: {
      type: String,
      required: false
    },
    clone: {
      type: Number,
      required: false
    }
  },
  methods: {
    onImgError: function(event) {
      this.failed_image = true;
    },
    handlerClearableIcon: function (e){
      if (!this.avatar) return
      console.log("This is handler ClearableIcon")
      let file = this.avatar.split('/').pop()

      this.deleteImage(file)
      console.log(file)

      console.log(this.project.href_avatar)
      this.avatar = "http://localhost:3010/build_project.png"
    },
    deleteImage: function(file){
      self = this
      console.log("deleteImage:", file)
      // console.log(self.avatar)
      // console.log(self.href_avatar)
      this.$axios.delete('/upload',   {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          "filename": file
       },
      }).then(function (response) {
        if (response.data) {
          self.avatar = response.data.file
          self.project.href_avatar = response.data.file
        }
        console.log(response);
      }).catch(function (error) {
        console.log(error)
      })
      return null
    },

    uploadImage(e) {
      if (!e) {
        console.log("avatar:" , this.avatar)
        console.log("href_avatar:" , this.href_avatar)
        console.log("project.href_avatar:" , this.project.href_avatar)

        return;
      }
      const upload_server = this.$store.state.server.upload
      const self = this;

      console.log("Upload Image")
      console.log(e)
      const uploadFormData = new FormData()
      uploadFormData.append('files', e)
      this.$axios.post('/upload', uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(function (response) {
        if (response.data) {
          self.avatar = response.data.file
          //console.log(response.data.file.split('/').pop())
          self.href_avatar = response.data.file
        }
        console.log(response);
      }).catch(function (error) {
            console.log(error)
      })
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   this.avatar = event.target.result;
      //   console.log('значение поля аватар:', this.viewImage);
      // }
      // reader.readAsDataURL(file);
    },
    validate () {
      this.$refs.form.validate();
    },
    saveNew() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        const newProject = {
          // id_project: Math.floor(Math.random() * 100000000),
          title: this.project.title,// +++++
          keywords: this.project.keywords ? this.project.keywords.split(",").map((item) => item.trim()) : '',// +++++
          abbreviation: this.project.abbreviation,// +++++
          status: 1,// +++++
          desc_full: this.project.desc_full,// +++++
          desc_short: this.project.desc_full.slice(0, 30)+'...',// +++++
          id_category: 2,// +++++
          href_avatar: this.href_avatar,// +++++
          is_favorites: false,// +++++
          is_owner: true,// +++++
          name_rev: "MK I",// +++++
          dt_start: `${new Date(Date.now()).toISOString()}`,// +++++
          dt_end: '',// +++++
          last_changed: `${new Date(Date.now()).toISOString()}`,// +++++
          last_changed_author: "",// +++++
          // last_changed_status: 1,
          actions: {},// +++++
          id_parent_project: 0,// +++++
          typeParent: this.project.typeParent,// +++++
          on_yarmarka: this.project.on_yarmarka,// +++++
          goal: this.project.goal,// +++++
          params: this.project.params,// +++++
          tag: "",
          cat_tree: this.project.cat_tree,
          // level: '',
          // level_desc: '',
        };        
        console.log(newProject, '- new project');
        let resultAdd;
        if (this.mode && !this.clone) {
          resultAdd = this.$store.dispatch("project/editRpoject", newProject);
        } else {
          resultAdd = this.$store.dispatch("project/addNew", newProject);
        }
        let mess = '';
        console.log(resultAdd,'resultAdd');
        if (!resultAdd.length) {
          mess = 0
        } else {
          mess = 1;
        }
        this.$emit('returnAdd',mess);
        // console.log(this.projects);
      }
    },
    back() {
        this.close = !this.close;
    //   this.$router.go(-1);
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
    closeView() {
      this.$emit('returnClose');
    },
    findParentProject(id) {
    },
    // loadFiles(input) {
    //   console.log(input);
    //   const file = input;
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     this.viewImage = event.target.result;
    //     console.log('значение поля аватар:', this.viewImage);
    //   }
    //   reader.readAsDataURL(file);
    // },
    // showInformation(){

    // }
  },
  computed: {
    projectEdit() {
      if (this.mode) {
        return this.mode;
      } else {
        return {}
      }
    },
    // ...mapGetters({
    //   projects: 'project/getProjects',
    //   favProjects: 'project/getFavProjects',
    // })
  },
  watch: {
    mode: {
      handler(newVal, oldVal) {
        // Object.keys(newVal).length
        if (newVal) {
          for (let key in newVal) {
            this.project[key] = newVal[key];
          }
          if (this.clone) {
            this.project.title = this.project.title + ' (клонированный проект)';
          }
        } else {
        this.project = Object.assign(this.project, this.newPr);
        console.log(this.project, 'this.project');
      }
        console.log(this.project, 'this.project');
      },
      deep: true
    },
  },
  mounted () {
    if (this.mode) {
      for ( let key in this.mode) {
        this.project[key] = this.mode[key];
        console.log(this.mode, 'запись данных по проекту в объект', key);
      }
      if (this.clone) {
        this.project.title = this.project.title + ' (клонированный проект)';
      }
      console.log(this.mode, 'данныt по проекту в объект записаны');
    } else {
      this.project = Object.assign(this.project, this.newPr);
      console.log(this.project, 'this.project');
    }
      // let a =
      // {
      //     id_project: Math.floor(Math.random() * 100000000),
      //     title: this.project.name,
      //     keywords: this.project.keyWords.split(",").map((item) => item.trim()),
      //     abbreviation: this.project.abbreviation,
      //     status: 1,
      //     desc_full: "",
      //     desc_short: this.project.short_descr,
      //     category: this.project.category,
      //     href_avatar: this.href_avatar,
      //     is_favorites: false,
      //     owner: true,
      //     status: 1,
      //     name_rev: ["MK I"],
      //     dt_start: new Date(Date.now()).toISOString(),
      //     dt_end: '',
      //     last_changed: new Date(Date.now()).toISOString(),
      //     last_changed_author: "",
      //     last_changed_status: 1,
      //     actions: {},
      //     id_parent_project: 0,  // ind
      //     typeParent: this.project.typeParent, //str
      //     onYarmarka: this.project.onYarmarka, //true
      //     goal: this.project.goal, //str
      //     params: this.project.params,
      //     tag: "",
      //     level: 3,
      //     level_desc: "",
      //     sections: [id, id2], //array
          // key_features: []

      //   };      
      // / id_project: Math.floor(Math.random() * 100000000),
      //     title: this.project.name,// +++++
      //     keywords: this.project.keyWords.split(",").map((item) => item.trim()),// +++++
      //     abbreviation: this.project.abbreviation,// +++++
      //     status: 1,// +++++
      //     desc_full: "",// +++++
      //     desc_short: this.project.short_descr,// +++++
      //     id_category: 2,// +++++
      //     href_avatar: this.href_avatar,// +++++
      //     is_favorites: false,// +++++
      //     is_owner: true,// +++++
      //     name_rev: "MK I",// +++++
      //     dt_start: ${new Date(Date.now()).toISOString()},// +++++
      //     dt_end: '',// +++++
      //     last_changed: ${new Date(Date.now()).toISOString()},// +++++
      //     last_changed_author: "",// +++++
      //     last_changed_status: 1,
      //     actions: {},// +++++
      //     id_parent_project: 0,// +++++
      //     typeParent: this.project.typeParent,// +++++
      //     on_yarmarka: this.project.onYarmarka,// +++++
      //     goal: this.project.goal,// +++++
      //     params: this.project.params,// +++++
      //     tag: "",
          //  ///level: '',
          // ////level_desc: '',
  }
}


</script>

<style scoped>
.close {
    display: none;
}
.card {
  border-radius: 14px!important;
  border: solid 1px #3914AF!important;
  padding: 10px 15px;
  margin: 40px;
}
.avatar {
  border: dashed 2px rgb(97, 94, 94) !important;
  border-radius: 10px !important;
  height: 147px;
  width: 147px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
  a:hover{
    color:black;
  }
.layout-new {
  background: rgba(46, 16, 140, 0.2);
  position: absolute;
  top: 0;
  /* bottom: 0; */
  left: 0;
  right: 0;
  z-index: 100;
  padding-top: 30px;
  
}
</style>
