<template>
  <div>
    <button @click="$router.go(-1)">Back</button>
    <br />
    <img :src="country.flag" alt="" />
    <h1>{{ country.name }}</h1>
    <p>Native name: {{ country.nativeName }}</p>
    <p>Population: {{ formatPopulation(country.population) }}</p>
    <p>Region: {{ country.region }}</p>
    <p>Sub Region: {{ country.subregion }}</p>
    <p>Capital: {{ country.capital }}</p>
    <p>
      Top Level Domain:
      <span v-for="domain in country.topLevelDomain" :key="domain">
        {{ domain }}
      </span>
    </p>
    <p>
      Currencies:
      <span v-for="{ code, name } in country.currencies" :key="code">
        {{ name }}
      </span>
    </p>
    <p>
      Languages:
      <span v-for="{ name, nativeName } in country.languages" :key="name">
        {{ name }} ({{ nativeName }})
      </span>
    </p>
    <div v-if="borders.length">
      <p>Border countries:</p>
      <ul>
        <li v-for="{ code, name } of borders" :key="code">
          <nuxt-link :to="{ name: 'country-code', params: { code: code } }">
            {{ name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    country: Object,
    borders: []
  }),
  async mounted() {
    const code = this.$route.params.code

    this.country = this.countries.length
      ? this.countries.find(c => c.alpha3Code === code)
      : await this.$axios.$get('/alpha/' + code)

    this.country.borders.forEach(async code => {
      this.borders.push(await this.getBorderName(code))
    })
  },
  methods: {
    async getBorderName(code) {
      const { name } = this.countries.length
        ? this.countries.find(country => country.alpha3Code === code)
        : await this.$axios.$get(`/alpha/${code}?fields=name`)

      return { name, code }
    },
    formatPopulation(number) {
      return new Intl.NumberFormat().format(number)
    }
  },
  computed: mapState(['countries'])
}
</script>
