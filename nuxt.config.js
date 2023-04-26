import colors from 'vuetify/es5/util/colors'
// import "vuetify/dist/vuetify.min.css";
// import '@mdi/font/css/materialdesignicons.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  publicRuntimeConfig: {
    REST_SERVER: process.env.REST_SERVER,
    UPLOAD_SERVER: process.env.UPLOAD_SERVER,
  },
  privateRuntimeConfig: {
    myPrivateToken: process.env.PRIVATE_TOKEN
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-test',
    title: 'nuxt-test',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/fonts/fonts.css',
    'vuetify/dist/vuetify.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      { src: '~/plugins/vuetify-mask.js' },
    // 'plugins/vuetify.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
  // Equivalent to { path: '~/components' }
    { path: '~/components' },
    { path: '~/components/portfolio', extensions: ['vue'] }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // ['@nuxtjs/eslint-module', { fix: true }],
    '@nuxtjs/vuetify',
  ],

    // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@nuxtjs/proxy'
  ],

  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },

  auth: {
  redirect: {
     login: '/',
     logout: '/login',
     callback: '/login',
     home: '/'
   },
   strategies: {
     local: {
       token: {
         property: 'access_token',
         global: true,
         // type: 'Bearer'
     },
       endpoints: {
         login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
         user: { url:  '/auth/user', method: 'get', propertyName: 'user' },
         logout: { url: '/auth/logout' , method: 'delete'  }
       },
       tokenType: ''
     }
   }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  //
  proxy: {
    // REST SERVER
    '/auth/': { target: 'http://127.0.0.1:8001/auth',
      pathRewrite: {'^/auth/': ''}
    },
    // REST SERVER
    '/api/': { target: 'http://127.0.0.1:8001',
      pathRewrite: {'^/api/': ''}
    },
    // UPLOAD SERVER
    '/upload': { target: 'http://0.0.0.0:3010',
      pathRewrite: {'^/upload/': ''}
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/scss/variables.scss', '~/assets/styles/scss/selectors.scss'],
    theme: {
      themes: {
        light: {
          primary: '#3914AF',
          accent: '#1E0A5C',
          secondary: '#F5F5FF',
          info: '#1E0A5C',
          warning: '#3914AF',
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          purplee: "#351BA9",
          bluedeep: "#1E0A5C",
          viewColor: '#C4B9E7',
          backPurple: '#F2EFFA',
          greenApp: '#06D200',
          redApp: '#FF5F5F'
        }
      }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Add exception
  transpile: [
    "vee-notifications"
  ],
  }
}
