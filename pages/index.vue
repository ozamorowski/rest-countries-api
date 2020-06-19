<template>
  <div>
    <div class="top-bar">
      <SearchBar :countries="countries" />

      <form>
        <select v-model="region">
          <option value="all">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>
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
        } of countriesByRegion"
        :key="alpha3Code"
        tag="div"
        :to="{ name: 'country-code', params: { code: alpha3Code } }"
      >
        <div class="card">
          <img :data-src="flag" uk-img alt="" height="179" />
          <div class="card-body">
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
import SearchBar from '@/components/SearchBar'

export default {
  components: { SearchBar },
  data: () => ({
    countries: [],
    region: 'all'
  }),
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      const res = await this.$axios.get('/all')
      this.countries = res.data
      this.$nuxt.$loading.finish()
    })
  },
  computed: {
    countriesByRegion() {
      if ((this.region === 'all') | !this.region) return this.countries

      return this.countries.filter(
        country => country.region.toLowerCase() === this.region
      )
    }
  }
}
</script>

<style lang="scss">
.top-bar {
  padding: 50px 0 70px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

input,
select {
  max-width: 100%;
  width: 100%;
  height: 60px;
  border: 0 none;
  border-radius: 6px;
  padding: 10px 30px;
  background: #fff;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  color: #666;
  font-size: 1em;

  &:focus {
    outline: none;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px 6%;
}

.card {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  }

  .card-body {
    padding: 20px;
  }
}
</style>
