export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: ['@/fonts/fonts.css'],
  plugins: ['@/plugins/lazyload.js'],
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'https://restcountries.eu/rest/v2'
  },
  server: {
    host: '0.0.0.0'
  },
  loading: '~/components/Loading.vue'
}
