<template>
  <div class="content">
    <button class="back" @click="$router.push('/')"><ArrowBack /> Back</button>
    <div class="flex">
      <div class="flag">
        <img v-lazy="country.flag" alt="" />
      </div>
      <div class="info">
        <div class="name">
          <h1>{{ country.name }}</h1>
        </div>
        <div class="details">
          <p><b>Native name:</b> {{ country.nativeName }}</p>
          <p><b>Population:</b> {{ formatPopulation(country.population) }}</p>
          <p><b>Region:</b> {{ country.region }}</p>
          <p><b>Sub Region:</b> {{ country.subregion }}</p>
          <p><b>Capital:</b> {{ country.capital }}</p>

          <p>
            <b>Top Level Domain:</b>
            <span v-for="domain in country.topLevelDomain" :key="domain">
              {{ domain }}
            </span>
          </p>
          <p>
            <b>Currencies:</b>
            <span v-for="{ code, name } in country.currencies" :key="code">
              {{ name }}
            </span>
          </p>
          <p>
            <b>Languages:</b>
            <span v-for="{ name, nativeName } in country.languages" :key="name">
              {{ name }} ({{ nativeName }})
            </span>
          </p>
        </div>
        <div class="borders" v-if="borders.length">
          <b>Border countries:</b><br /><br />

          <nuxt-link
            v-for="{ code, name } of borders"
            :key="code"
            :to="{ name: 'country-code', params: { code: code } }"
            tag="button"
          >
            {{ name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ArrowBack from '@/components/IconArrowBack'

export default {
  components: { ArrowBack },
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

<style lang="scss">
.back {
  margin: 40px 0;
  padding-left: 10px;
}
.flex {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

  > * {
    flex: 1 1 40rem;
  }
}

.flag {
  img {
    padding-right: 40px;
    margin-bottom: 40px;
  }
}

.info {
  padding-left: 40px;
}

button {
  color: #666;
  cursor: pointer;
  padding: 0 15px;
  line-height: 28px;
  font-size: 0.875rem;
  background-color: transparent;
  border: 1px solid #e5e5e5;
  margin: 5px;

  &:hover {
    border-color: #b2b2b2;
  }
}
</style>
