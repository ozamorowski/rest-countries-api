<template>
  <div>
    <div class="top-bar">
      <SearchBar />
      <RegionFilter />
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
        } of getByRegion"
        :key="alpha3Code"
        tag="div"
        :to="{ name: 'country-code', params: { code: alpha3Code } }"
      >
        <div class="card">
          <img :data-src="flag" uk-img height="179" />
          <div class="card-body">
            <h3>{{ name }}</h3>
            <p><b>Population:</b> {{ formatPopulation(population) }}</p>
            <p><b>Region:</b> {{ region }}</p>
            <p><b>Capital:</b> {{ capital }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchBar from '@/components/SearchBar'
import RegionFilter from '@/components/RegionFilter'

export default {
  components: { SearchBar, RegionFilter },
  async fetch(data) {
    await data.store.dispatch('getCountries')
  },
  methods: {
    setRegion(event) {
      this.$store.commit('setRegion', event.target.value)
    },
    formatPopulation(number) {
      return new Intl.NumberFormat().format(number)
    }
  },
  computed: mapGetters(['getByRegion'])
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

img {
  animation: fadein 2s;
}

img:not([src]) {
  min-width: 1px;
  visibility: hidden;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
