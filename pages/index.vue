<template>
  <div class="container">
    <form class="uk-search uk-search-large">
      <span uk-search-icon></span>
      <input
        class="uk-search-input"
        type="search"
        v-model="search"
        placeholder="Search..."
      />
    </form>
    <ul>
      <li v-for="{ alpha3Code, name } of filteredCountries" :key="alpha3Code">
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
    countries: [],
    search: ''
  }),
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      const res = await axios.get('https://restcountries.eu/rest/v2/all')
      this.countries = res.data
      this.$nuxt.$loading.finish()
    })
  },
  computed: {
    filteredCountries() {
      return this.countries.filter(country =>
        country.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
}
</script>
