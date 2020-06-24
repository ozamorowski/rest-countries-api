<template>
  <div>
    <Header />

    <div class="container">
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

<style lang="scss">
html,
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.container {
  display: flow-root;
  box-sizing: content-box;
  max-width: 1400px;
  padding-left: 40px;
  padding-right: 40px;
  margin: auto;
}

img {
  max-width: 100%;
  width: 100%;
}
</style>
