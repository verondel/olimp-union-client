<template>
      <v-container>

            <v-row  v-if="$auth.loggedIn"  justify-center wrap>
                <v-col col="12" align-self="center">
                 <v-btn text @click="$auth.logout()">Logout</v-btn>
          <!-- v-if="$auth.loggedIn" -->
                </v-col>
            </v-row>
                <v-row justify-center wrap>
                    <v-col col="12" align-self="center">
                    <h1 class="comment-title" :size="fontSize">{{ title  }}</h1>
                    <p class="text-caption font-weight-light d-block text-center">{{message}}</p>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center pa-0">
                    <v-col col="6" sm="8" xs="12" align-self="center" >
                        <v-form ref="form"
                          @submit.prevent="login"
                          v-model="valid"
                          lazy-validation>
                          <label for="name">Логин</label>
                          <v-text-field id="name"
                            type="text"
                            v-model.trim="user.login"
                            class="border-radius.rounded-lg pa-0 ma-1"
                            :counter="50"
                            :rules="nameRules"
                            outlined
                            clearable
                            color="blue darken-2"
                            onchange="validate"
                            height=40px
                            required></v-text-field>
                    <!-- </v-row> label="Александрович"-->
                    <!-- <v-row class="pa-1 my-2 d-block"> -->
                        <label for="password">Пароль</label>
                        <v-text-field id="password"
                            v-model.trim="user.password"
                            :rules="passwordRules"
                            class="border-radius.rounded-lg"
                            counter="50"
                            :append-icon="showPasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPasswordIcon ? 'text' : 'password'"
                            @click:append="showPasswordIcon = !showPasswordIcon"
                            outlined
                            clearable
                            onchange="validate"
                            color="blue darken-2"
                            required></v-text-field>
                        <v-row class="pa-0 ma-3 justify-space-between align-item-center">
                          <!-- <v-col cols="2" > -->
                            <v-btn depressed small class="my-4 rounded-xl" dark color="#351BA9">
                                <v-icon>&#x2713</v-icon>
                            </v-btn>
                          <!-- </v-col>
                          icon="mdi-check"
                          <v-col cols="10"> -->
                            <nuxt-link to="/password/forgot" color="#351BA9"
                                class="d-block ma-2 text-decoration-none ma-1">Забыли пароль?</nuxt-link>
                          <!-- </v-col> -->
                        </v-row>
                        <v-btn type="submit"
                            class="d-online-block elevation-2 ma-5 px=10"
                            width="60%"
                            dark color="#351BA9">Войти</v-btn>
                    </v-form>
                   </v-col>
                   <v-overlay
                    :absolute="absolute"
                    :z-index="zIndex"
                    :value="overlay">
                    <v-btn
                      class="erroruser white--text"
                      color="#351BA9"
                      @click="overlay = false">{{answer}}</v-btn>
                   </v-overlay>
                </v-row>
                <v-row class="pa-0 mt-12 justify-start align-self-center">
                    <nuxt-link to="#" color="#351BA9"
                                class="text-decoration-none black--text pa-4">Впервые в Олимп?</nuxt-link>
                    <nuxt-link to="/registration/index" color="#351BA9"
                                class="text-decoration-none #351BA9--text pa-4">Зарегистрироваться?</nuxt-link>
                </v-row>

      </v-container>

</template>
<script>
import {mapMutations} from 'vuex';

export default {
    layout: 'auth',
    data(){
        return {
            user : {
                login: "string",
                password: "string"
            },
            nameRules: [
              v => !!v || 'Поле должно быть заполнено',
              v => (v && v.length <= 50) || 'Логин не может быть больше 50 символов',
            ],
            passwordRules: [
              v => !!v || 'Поле должно быть заполнено',
              v => (v && v.length >= 6) || 'Пароль не может быть меньше 6 символов',
            ],
            // page: "auth",
            title: "Добро пожаловать!",
            message: "Пожалуйста, войдите в свой профиль",
            overlay: false,
            absolute: true,
            valid: true,
            zIndex: 1,
            answer: "",
            showPasswordIcon: false
        }
    },
    computed: {
      fontSize () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '1.5em'
          case 'sm': return '2.6em'
          case 'md': return '3.3em'
          case 'lg': return '4.11em'
          case 'xl': return '4.11em'
        }
      },
    },
    methods: {
      async login() {
         const isValid = this.$refs.form.validate();
          if (isValid) {
          try {
           console.log('call local politic')
           var respons = await this.$auth.loginWith('local', {
             data: {
               login: this.user.login,
               password: this.user.password
             }
           })
           console.log(respons.data)
           if (respons.data.app_code == 403) {
           // TODO: дописать логику отображения сообщения о неправильном логине  и пароле
             this.overlay = true;
             console.log("показываем на форме предупреждение о логине");
             this.answer = 'Пользователь не зарегистрирован';
           }

           if (respons.data.app_code == 401) {
             this.overlay = true;
             console.log("показываем на форме предупреждение что пароль не подходит");
             this.answer = 'Неверный пароль';
           }
           console.log(this.$auth.user)
           // this.$router.push('/')
         } catch (e) {
          // TODO: выводить сообщение пользователю что сервер не доступен
           this.overlay = true;
           console.log("сервер не доступен , попробуйте повторить попытку позже")
           console.log(e)
           this.answer = 'Повторите попытку позже';
          }
        }
      },
      validate () {
          this.$refs.form.validate();
      }
    }

}
</script>

<style>
.comment-title {
  /* font-size: 4.11em; 70px */
  font-weight: bold;
  color: #351BA9;
  text-align: center;
  margin: 0 0 1.95vh 0; /* 20px */
}
.erroruser {
  text-align: center;
  font-size: 1.6em;
}

</style>
