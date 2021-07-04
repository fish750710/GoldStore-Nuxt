const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
      router: {
        base: '/GoldStore-Nuxt-static/'
      }
    }
    : {}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',  //SSR: universal

  // Global page headers: https://go.nuxtjs.dev/config-head
  // 共用
  head: {
    title: '拜金電子',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
    ],
    // script: [
    //   // 引入檔案
    //   { src: '/jquery-3.4.1.min.js' },
    //   // 引入 CDN
    //   { src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.js' }
    // ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/transition.scss',
    'swiper/swiper.scss',
  ],

  dev: true, //開發模式:true, PRD:false

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    APIPATH: process.env.VUE_APP_APIPATH || 'https://vue-course-api.hexschool.io',
    CUSTOMPATH: process.env.VUE_APP_CUSTOMPATH || 'hans',
  },

  loading: { color: '#f9cd25', height: '5px', duration: 800 },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // 插件
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', ssr: false },
    { src: '@/plugins/veevalidate', srr: false },
    { src: '@/plugins/filter.js', srr: false },
    // { src: '@/plugins/main', ssr: false }
    // { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources' // 共用css 變數
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  //客製化套件
  modules: [
    '@nuxtjs/axios'
  ],
  // 共用css 變數
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  transition: {
    name: 'layout',
    mode: 'out-in'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'https://fish750710.github.io/GoldStore-Nuxt-static',
    analyze: true,
  },
  buildDir: 'dist',
  // // 覆蓋預設router
  // router:{},
  router: {
    middleware: 'stats',
    base: '/GoldStore-Nuxt-static'
  }

  // // 可監聽指定檔案更改時重啟 server
  // watch:'',

}
