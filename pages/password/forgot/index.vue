<template>
      <v-container>
                <v-row justify-center wrap>
                    <v-col col="12" align-self="center">
                    <h1 class="comment-title" :size="fontSize">{{ title  }}</h1>
                    <p class="text-caption font-weight-light d-block text-center">{{message}}</p>
                    </v-col>
                </v-row>
                <v-row class="pa-0" justify="center">
                    <v-col col="6" sm="8" xs="12" align-self="center" >
                        <v-form ref="form"
                          @submit.prevent="forgotpsw"
                          v-model="valid"
                          lazy-validation>
                        <label for="email">Почта</label>
                        <v-text-field id="email"
                            type="email"
                            v-model.trim="user.email"
                            class="border-radius.rounded-lg"
                            counter="50"
                            :rules="emailRules"
                            outlined
                            clearable
                            color="blue darken-2"
                            required></v-text-field>
                    
                        <v-row class="pa-1 my-2 justify-center">
                            <v-btn type="submit" depressed class="d-block ma-3 px=10"
                                dark color="#351BA9" width="60%">Подтвердить</v-btn>
                                <!-- :disabled="!valid" -->
                            <v-btn outlined color="#351BA9"
                                class="d-block ma-3 px=10 #351BA9--text" width="60%">
                              <nuxt-link to="/registration"
                                class="text-decoration-none">Зарегистрироваться?</nuxt-link>
                            </v-btn>
                          <!-- </v-col> -->
                        </v-row>
                    </v-form>
                    <v-overlay
                    :absolute="absolute"
                    :z-index="zIndex"
                    :value="overlay">
                    <v-btn
                      class="erroruser white--text"
                      color="#351BA9"
                      @click="overlay = !overlay">{{answer}}</v-btn>
                   </v-overlay>
                   </v-col>
                </v-row>
      </v-container>

</template>
<script>

export default {
    layout: 'auth',
    data(){
        return {
            user : {
                password: "",
                email: "example@mail.ru"
            },
            emailRules: [
              v => !!v || 'Поле должно быть заполнено',
              v => v!=="example@mail.ru" || 'Введите свой адрес почты',
              v => /.+@.+\..+/.test(v) || 'Введите верный адрес почты',
            ],
            page: "auth",
            title: "Забыли пароль?",
            message: "На почту будет отправлено письмо для смены пароля",
            overlay: false,
            absolute: true,
            valid: true,
            zIndex: 1,
            answer: ""
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
        validate () {
            this.$refs.form.validate();
        },
        async forgotpsw() {
          // используется lazy validation:
          const isValid = this.$refs.form.validate();
          if (isValid) {
          try {
          //  console.log('call local politic')
           let respons = await this.$axios.post('/password/forgot', {
             data: {
               email: this.user.email
             }
           })
           console.log(respons.data);
           if (respons.data.app_code == 200) {
            this.overlay = true;
            this.answer = 'На почту отправлено письмо для смены пароля';
             
             // задержка по времени
             function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
             }
             sleep(10000).then(() => { 
              //  window.location.replace('/login');
              this.router.push('/login');
             });
          }
           if (respons.data.app_code == 403) {
             this.overlay = true;
           // TODO: узнать код для 'почты нет в б.д.'
             console.log("показываем на форме предупреждение о почте");
             this.answer = 'Не верно указана почта';
           }
           } catch (e) {
             this.overlay = true;
             console.log("сервер не доступен, попробуйте повторить попытку позже");
             console.log(e);
             this.answer = 'Повторите попытку позже';
           }
         };
        //  this.$refs.form.resetValidation();
      },
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
</style>
