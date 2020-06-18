<template>
  <div>
    <input
      class="search"
      type="search"
      v-model="search"
      placeholder="Search for country..."
    />
    <div class="grid">
      <router-link
        v-for="{
          alpha3Code,
          name,
          flag,
          population,
          region,
          capital
        } of filteredCountries"
        :key="alpha3Code"
        tag="div"
        :to="{ name: 'country-code', params: { code: alpha3Code } }"
      >
        <div class="uk-card uk-card-small uk-card-hover">
          <div class="uk-card-media-top">
            <img :data-src="flag" uk-img alt="" height="179" />
          </div>
          <div class="uk-card-body">
            <h3>{{ name }}</h3>
            <p><b>Population:</b> {{ population }}</p>
            <p><b>Region:</b> {{ region }}</p>
            <p><b>Capital:</b> {{ capital }}</p>
          </div>
        </div>
      </router-link>
    </div>
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px 6%;
}
</style>
