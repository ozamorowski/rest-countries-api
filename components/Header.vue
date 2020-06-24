<template>
  <nav>
    <div class="container">
      <a href="/">Where in the world?</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
nav {
  background: white;
  height: 80px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);

  .container {
    max-width: 1400px;
    height: 100%;
    margin: auto;
    padding: 0 40px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
  }

  a {
    color: black;
    font-size: 1.5em;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      color: #3e3e3e;
    }
  }
}
</style>
