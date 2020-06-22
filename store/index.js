export const state = () => ({
  countries: [],
  region: 'all'
})

export const mutations = {
  setCountries(state, payload) {
    state.countries = payload
  },
  setRegion(state, payload) {
    state.region = payload
  }
}

export const actions = {
  async getCountries({ commit }) {
    const { data } = await this.$axios.get('/all')
    commit('setCountries', data)
  }
}

export const getters = {
  getByRegion({ region, countries }) {
    return region === 'all'
      ? countries
      : countries.filter(country => country.region.toLowerCase() === region)
  }
}
