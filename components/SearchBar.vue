<template>
  <div>
    <form>
      <input
        class="search"
        type="search"
        v-model="search"
        placeholder="Search for country..."
      />

      <div class="results" v-if="search">
        <router-link
          v-for="{ alpha3Code, name } in results"
          :key="alpha3Code"
          tag="div"
          :to="{ name: 'country-code', params: { code: alpha3Code } }"
          v-html="boldResult(name)"
        >
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    countries: Array
  },
  data: () => ({
    search: ''
  }),
  computed: {
    results() {
      if (this.search.length < 2) return

      return this.countries.filter(country =>
        country.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    boldResult(name) {
      const reg = new RegExp(this.search, 'gi')
      return name.replace(reg, `<b>${name.match(reg)}</b>`)
    }
  }
}
</script>

<style lang="scss">
$width: 500px;
form {
  width: $width;
}

.search {
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

.results {
  position: absolute;
  width: $width;
  max-height: 370px;
  overflow: auto;
  z-index: 999;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  > div {
    cursor: pointer;
    padding: 25px;
    border-bottom: 1px solid #eee;

    &:hover {
      background: #e3e3e3;
    }
  }
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='checkbox'],
  input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}
</style>
