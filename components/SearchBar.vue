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
      if (this.search.length > 2)
        return this.$store.state.countries.filter(country =>
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

<style scoped lang="scss">
$width: 500px;

form {
  width: $width;
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
</style>
