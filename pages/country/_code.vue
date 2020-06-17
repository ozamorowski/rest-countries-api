<template>
  <div>
    <button @click="$router.go(-1)">Back</button>
    <br />
    <img :src="country.flag" alt="" />
    <h1>{{ country.name }}</h1>
    <p>Native name: {{ country.nativeName }}</p>
    <p>Population: {{ country.population }}</p>
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
      <span v-for="curr in country.currencies" :key="curr.code">
        {{ curr.name }}
      </span>
    </p>
    <p>
      Languages:
      <span v-for="lang in country.languages" :key="lang.name">
        {{ lang.name }} ({{ lang.nativeName }})
      </span>
    </p>
    <div>
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
import axios from 'axios'

export default {
  data: () => ({
    country: Object,
    borders: []
  }),
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.true

      const res = await axios.get(
        'https://restcountries.eu/rest/v2/alpha/' + this.$route.params.code
      )
      this.country = res.data

      this.country.borders.forEach(async code => {
        this.borders.push(await this.getBorderName(code))
      })

      this.$nuxt.$loading.false
    })
  },
  methods: {
    getBorderName: async code => {
      const { data } = await axios.get(
        `https://restcountries.eu/rest/v2/alpha/${code}?fields=name`
      )
      return { name: data.name, code }
    }
  }
}
</script>
