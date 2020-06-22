<template>
  <form>
    <select @change="e => $store.commit('setRegion', e.target.value)">
      <option
        v-for="{ name, value } in options"
        :selected="$store.state.region === value"
        :value="value"
        :key="value"
      >
        {{ name }}
      </option>
    </select>
  </form>
</template>

<script>
export default {
  data: () => ({
    options: [
      { name: 'Filter by region', value: '' },
      { name: 'Africa', value: 'africa' },
      { name: 'Americas', value: 'americas' },
      { name: 'Asia', value: 'asia' },
      { name: 'Europe', value: 'europe' },
      { name: 'Oceania', value: 'oceania' }
    ]
  })
}
</script>
