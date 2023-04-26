<template>
  <!-- <v-container class="black " style="padding: 0px" fluid> -->

  <v-container
    class="portfolio-container"
    fluid
  >
    <v-row no-gutters>
      <v-col
        class="sidebar-portfolio"
        md="3"
      >
        <MenuPortfolio />
      </v-col>
      <v-col
        class="form-col"
        md="9"
      >
        <v-form
          ref="form"
          v-model="valid"
          class="form-profile"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-container>
            <v-row>
              <v-col
                sm="10"
              >
                <h3>
                  Основная информация.
                </h3>
                <hr>
                <!-- start section of crop wrapper -->
                <!-- <example-wrapper
                  :no-border="true"
                  class="upload-example"
                >
                  <div class="upload-example__cropper-wrapper">
                    <cropper ref="cropper" class="upload-example__cropper" check-orientation :src="image.src" />
                    <div class="upload-example__reset-button" title="Reset Image" @click="reset()">
                      <img :src="svgPath">
                    </div>
                    <div v-if="image.type" class="upload-example__file-type">
                      {{ image.type }}
                    </div>
                  </div>
                  <div class="upload-example__buttons-wrapper">
                    <button class="upload-example__button" @click="$refs.file.click()">
                      <input ref="file" type="file" accept="image/*" @change="loadImage($event)">
                      Upload image
                    </button>
                    <button v-if="image.src" class="upload-example__button" @click="showImage()">
                      Crop
                    </button>
                  </div>
                </example-wrapper> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="3">
                <!-- start section of Avatar -->
                <v-card class="avatar">
                  <img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="128"
                    max-width="128"
                    :src="image.avatar"
                  >
                  <v-icon>{{ svgPath }}</v-icon>
                </v-card>
              </v-col>
              <v-col sm="3">
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Выберете фото"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  v-model="name"
                  label="Имя"
                  color="#033"
                  outlined
                  dense
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                />
                <v-text-field
                  v-model="suname"
                  label="Фамилия"
                  color="#033"
                  outlined
                  dense
                  :error-messages="sunameErrors"
                  @input="$v.suname.$touch()"
                  @blur="$v.suname.$touch()"
                />

                <v-menu
                  v-model="
                    menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field

                      :value="computedDateFormattedMomentjs"
                      outlined
                      dense
                      label="Дата рождения"
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="date = null"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    locale="ru-ru"
                    :first-day-of-week="1"
                    @change="menu1 = false"
                  />
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="10">
                <h3>
                  Контактная информация
                </h3>
                <hr>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="6">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  outlined
                  dense
                  required
                  label="Email"
                  append-icon="mdi-email"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                />
                <v-text-field-simplemask
                  v-model="phone"
                  :append-icon="icon"
                  :label="label"

                  :properties="{
                    prefix: '+7',
                    suffix: '',
                    dense: true,
                    readonly: false,
                    disabled: false,
                    outlined: true,
                    clearable: true,
                    'append-icon':'mdi-cellphone',

                    placeholder: '(000) ___-__-__',
                  }"
                  :options="{
                    inputMask: '(###) ###-##-##',
                    outputMask: '###########',
                    empty: null,
                    applyAfter: false,
                    alphanumeric: true,
                    required:true,
                    lowerCase: false,
                    'error-messages':'phoneErrors',

                  }"
                  :focus="focus"

                  @focus="focus = false"
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                />

                <v-text-field
                  outlined
                  dense
                  label="Social Network"
                  append-icon="mdi-facebook"
                />
              </v-col>
            </v-row>
            <!-- BUTTONS -->
            <v-row class="d-flex flex-row-reverse">
              <v-col sm="9">
                <v-btn
                  class="mr-4"
                  :disabled="invalid"
                  @click="submit"
                >
                  Сохранить
                </v-btn>
                <v-btn @click="clear">
                  Очистить
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import moment from 'moment'
import { format, parseISO } from 'date-fns'
import { mdiImageArea } from '@mdi/js'
import MenuPortfolio from '~/components/portfolio/MenuPortfolio.vue'
import { Cropper } from 'vue-advanced-cropper'

import 'vue-advanced-cropper/dist/style.css'

function getMimeType (file, fallback = null) {
  const byteArray = (new Uint8Array(file)).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    phone: { required },
    suname: { required }
  },

  data: () => ({
    selectedItem: 1,
    components: { MenuPortfolio, Cropper },
    // date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    svgPath: mdiImageArea,
    date: '',
    menu1: false,
    menu2: false,
    // value: '99999999999',
    // label: 'Phone Number',
    value: '',
    label: 'Телефон',
    focus: false,
    icon: 'mdi-cellphone',
    name: 'Вася',
    suname: 'Пупкин',
    phone: '+7 (921) 348-46-42 ',
    email: '',
    image: {
      src: null,
      type: null,
      avatar: ''
    }
  }),

  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('DD.MM.YYYY') : ''
    },
    computedDateFormattedDatefns () {
      return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) { return errors }
      !this.$v.phone.required && errors.push('Необходимо ввести телефон !')
      return errors
    },

    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.required && errors.push('Необходимо ввести имя!')
      return errors
    },
    sunameErrors () {
      const errors = []
      if (!this.$v.suname.$dirty) { return errors }
      !this.$v.suname.required && errors.push('Необходимо ввести фамилию!')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Введите корректную почту!')
      !this.$v.email.required && errors.push('Необходимо ввести почтовый ящик!')
      return errors
    }

  },
  destroyed () {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src)
    }
  },
  methods: {
    async submit () {

      console.log('call local politic')
      var respons = await this.$axios.post('/collection/set', {
        data: {
          name: this.name,
          surname: this.email
        }
      })
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
    },
    crop () {
      const { canvas } = this.$refs.cropper.getResult()
      canvas.toBlob((blob) => {
        // Do something with blob: upload to a server, download and etc.
      }, this.image.type)
    },
    reset () {
      this.image = {
        src: null,
        type: null
      }
    },
    showImage () {
      console.log('Call method show image')
      const { canvas } = this.$refs.cropper.getResult()
      this.image.avatar = canvas.toDataURL()

      // const newTab = window.open()

      document.getElementsByClassName('avatar')[0].innerHTML = `<img         max-height="128"
              max-width="128" src="${canvas.toDataURL()}"></img>`
    },
    loadImage (event) {
      // Reference to the DOM input element
      const { files } = event.target
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src)
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0])

        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }

        // Create a new FileReader to read this image binary data
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.image = {
            // Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: getMimeType(e.target.result, files[0].type)
          }
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0])
      }
    }
  }

}
</script>

<style lang="scss">
.upload-example {
	margin-top: 20px;
	margin-bottom: 20px;
	user-select: none;
	&__cropper {
		border: solid 1px #eee;
		min-height: 300px;
		max-height: 500px;
		width: 100%;
	}
	&__cropper-wrapper {
		position: relative;
	}
	&__reset-button {
		position: absolute;
		right: 20px;
		bottom: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 42px;
		width: 42px;
		background: rgba(#3fb37f, 0.7);
		transition: background 0.5s;
		&:hover {
			background: #3fb37f;
		}
	}
	&__buttons-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 17px;
	}
	&__button {
		border: none;
		outline: solid transparent;
		color: white;
		font-size: 16px;
		padding: 10px 20px;
		background: #3fb37f;
		cursor: pointer;
		transition: background 0.5s;
		margin: 0 16px;
		&:hover,
		&:focus {
			background: #38d890;
		}
		input {
			display: none;
		}
	}
	&__file-type {
		position: absolute;
		top: 20px;
		left: 20px;
		background: #0d0d0d;
		border-radius: 5px;
		padding: 0px 10px;
		padding-bottom: 2px;
		font-size: 12px;
		color: white;
	}
}

/* .v-text-field input {
    line-height: 12px !important;
}

.v-input input {
    max-height: 12px;
} */
.form-profile .avatar {
  min-height: 8em;
  max-width: 8em;
  border: 2px dashed #686868;
  box-shadow: unset !important;

}

.form-profile {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 1em;
}

.form-profile   h3 {
  display: block;
  font-size: 1.17em;
  font-weight: 400;

}

.form-profile  hr {
    border: 1px solid whitesmoke;
}

.portfolio-container {
  padding: 0px;
}

.form-col {
  padding: 1em !important;
  background-color: whitesmoke;
}

.v-navigation-drawer__content  .v-list-item__content {
    color: white;
}

</style>
