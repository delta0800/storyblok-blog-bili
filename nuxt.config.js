const axios = require('axios')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'Storyblok + Nuxt = <3',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'An awesome blog about tech stuff, build with Nuxt and Storyblok'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production' ? 'Ny9iwo5iTZrdg6rzNsQ6pAtt' : '5LXTc782KhmIG4jZQRidNwtt',
        cacheProvider: 'memory'
      }
    ]
  ],

  generate: {
    routes: function () {
      return axios.get(
        'https://api.storyblok.com/v1/cdn/stories?version=published&token=Ny9iwo5iTZrdg6rzNsQ6pAtt&starts_with=blog&cv=' +
          Math.floor(Date.now() / 1e3)
      ).then((res) => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug)
        return [
          '/',
          '/blog',
          '/about',
          ...blogPosts
        ]
      })
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
