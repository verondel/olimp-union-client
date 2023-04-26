<template>
  <section>
    <v-row>
    <v-col class="sidebar-portfolio"
      md="3">
      <MenuPortfolio />
    </v-col>
    <v-col md-9 pa-0 color='whitesmoke'>
      <v-form ref="form"
        @submit.prevent="saveAdd"
        v-model="valid"
        lazy-validation>
        <v-row>
          <v-col sm="10">
            <h3>Дополнительное образование</h3>
            </v-col>
        </v-row>
        <v-container class="py-3 px-0">
          <v-row>
            <v-col class="d-flex flex-wrap"
                cols="6"
                sm="8">
            <div v-for="education in add_education" :key="education.id_add" class="add-aducation">
              <v-row width="100%">
              <v-col cols="12" sm="6"   class="py-0 d-inline-block">
                <label for="typeSelect">Тип</label>
                <v-select
                  id="typeSelect"
                  :items="items"
                  height="30px"
                  v-model.trim="education.type"
                  class="rounded-lg pa-0 ma-0"
                  outlined></v-select>
              </v-col>
              <v-col cols="12"
                  sm="6" class="py-0 d-inline-block">
                  <label for="duration">Длительность</label>
                  <v-text-field id="duration"
                      type="text"
                      v-model.trim="education.duration"
                      class="rounded-lg pa-0 ma-0"
                      :counter="30"
                      :rules="durationRules"
                      outlined
                      append-icon="mdi-calendar"
                      clearable
                      height="30px"
                      color="blue darken-2"
                      onchange="validate"
                      required></v-text-field>
              </v-col>
              <v-col  cols="12"  class="py-0">
                  <label for="univer">Учебное заведение, образовательная платформа</label>
                  <v-text-field id="univer"
                      type="text"
                      v-model.trim="education.university"
                      class="rounded-lg pa-0 ma-0"
                      :counter="100"
                      :rules="univerRules"
                      outlined
                      clearable
                      color="blue darken-2"
                      onchange="validate"
                      height=30px
                      required></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                  <label for="description">Описание</label>
                  <v-textarea id="description"
                      v-model.trim="education.description"
                      auto-grow
                      outlined
                      class="rounded-lg"
                      rows="5"
                      row-height="36"></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0">
                  <label for="description">Дипломы и сертификаты</label>
                  <v-file-input
                    show-size
                    counter
                    multiple
                    class="rounded-lg pa-0 ma-0"></v-file-input>
              </v-col>
              <v-col>
                <v-btn v-if="show_delete"
                  outlined
                  ref="delete"
                  @click="delete_education(education.id_add)"
                  color="#351BA9"
                  class="d-block rounded-lg elevation-1 mt-1 mb-5 px=10"
                  width="30%">Удалить</v-btn>
                  <p v-else></p>
              </v-col>
              </v-row>
            </div>
            </v-col>
          </v-row>
        </v-container>
        <v-row>
          <v-col>
            <v-btn 
              text
              @click="add_new"
              class="d-block ml-0 my-5 px=0"
              color="grey">Добавить еще одно образование +</v-btn>
            <v-btn type="submit"
              class="d-online-block rounded-lg elevation-2 ma-5 px=10"
              width="30%"
              dark color="#351BA9">Сохранить</v-btn>
            <!-- <v-btn outlined
              @click="cancel"
              color="#351BA9"
              class="d-online-block rounded-lg elevation-1 ma-5 px=10"
              width="30%">Отмена</v-btn> -->
              <!-- <v-overlay
                :absolute="absolute"
                :z-index="zIndex"
                :value="overlay">
                <v-btn
                  class="erroruser white--text pa-md-4 mx-lg-auto"
                  ref="erroruser"
                  color="#351BA9"
                  @click="overlay = !overlay">{{answer}}</v-btn>
              </v-overlay> -->
          </v-col>
        </v-row>
      </v-form>
    </v-col>
      </v-row>
  </section>
</template>
<script>
import MenuPortfolio from '~/components/portfolio/MenuPortfolio.vue'
// import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    
    data:() =>({
        // return {
            components: {MenuPortfolio},
            add_education : [
              {
                id_add: 0,
                type: "",
                duration: "",
                university: "Название",
                description: "Расскажите, что вы делали, что получили от этого образования",
                diploma: ""
              }
            ],
            univerRules: [
              v => !!v || 'Поле должно быть заполнено',
              // v => !v=='Название' || 'Поле должно быть заполнено',
              v => (v && v.length <= 100) || 'Название учебного заведения не может быть больше 100 символов',
            ],
            durationRules: [
              v => !!v || 'Поле должно быть заполнено',
              v => (v && v.length <= 30) || 'Длительность не может быть больше 30 символов',
            ],
            overlay: false,
            absolute: true,
            zIndex: 1,
            answer: "",
            valid: true,
            items: ['Курсы','Онлайн курсы'],
            i: 0
        // }
    }),
    computed: {
      show_delete(){
        return this.add_education.length>1
      }
    },
    methods: {
      ...mapActions([
        'setAddAducat'
      ]),
      validate () {
          this.$refs.form.validate();
      },
      saveAdd() {
        const isValid = this.$refs.form.validate();
        if (isValid) {
            let respons = this.setAddAducat(this.add_education);
            console.log(respons);
            if (respons.error==="Network Error") {
              // this.overlay = true;
              // this.answer = 'Повторите попытку позже';
            }
        }
      },
      delete_education(id) {
        this.add_education = this.add_education.filter(item => item.id_add !== id);
      },
      add_new(){
        this.i = this.i + 1;
        let new_education = {
              id_add: 0,
              type: "",
              duration: "",
              university: "Название",
              description: "Расскажите, что вы делали, что получили от этого образования",
              diploma: ""};
        new_education.id_add = this.i
        this.add_education.push(new_education);
        console.log(this.add_education);
      }
    }
}
</script>

<style scoped>
.add-aducation {
  border-block-end: 2px solid rgb(116, 115, 115);
  margin: 15px 0;
}
</style>
