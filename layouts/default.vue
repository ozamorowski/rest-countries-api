<template>
  <div :class="$store.state.darkTheme ? 'theme-dark' : 'theme-light'">
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

.theme-light {
  --color-primary: #0060df;
  --color-secondary: #fbfbfe;
  --color-accent: #fd6f53;
  --font-color: #000000;
  background: var(--color-secondary);
  color: var(--font-color);
}

.theme-dark {
  --color-primary: #17ed90;
  --color-secondary: #243133;
  --color-accent: #12cdea;
  --font-color: #ffffff;
  background: var(--color-secondary);
  color: var(--font-color);
}
</style>
