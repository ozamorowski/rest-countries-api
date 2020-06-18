<template>
  <div>
    <Header />

    <div class="uk-container uk-container-large">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: { Header }
}
</script>
