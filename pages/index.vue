<template>
  <div class="container">
    <ul>
      <li v-for="{ alpha3Code, name } of countries" :key="alpha3Code">
        <nuxt-link :to="{ name: 'country-code', params: { code: alpha3Code } }">
          {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    countries: []
  }),
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      const res = await axios.get('https://restcountries.eu/rest/v2/all')
      this.countries = res.data
      this.$nuxt.$loading.finish()
    })
  }
}
</script>
