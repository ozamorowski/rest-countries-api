<template>
  <div>
    <div class="top-bar">
      <SearchBar :countries="countries" />
    </div>
    <div class="grid">
      <router-link
        v-for="{
          alpha3Code,
          name,
          flag,
          population,
          region,
          capital
        } of countries"
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
import SearchBar from '@/components/SearchBar'

export default {
  components: { SearchBar },
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

<style scoped lang="scss">
.top-bar {
  padding: 50px 0 70px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px 6%;
}
</style>
