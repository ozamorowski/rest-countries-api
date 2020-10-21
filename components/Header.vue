<template>
  <nav>
    <div class="container">
      <a href="/">Where in the world?</a>
      <label id="switch" class="switch">
        <input
          type="checkbox"
          @change="$store.commit('setTheme', !$store.state.darkTheme)"
          id="slider"
        />
        <span class="slider round"></span>
      </label>
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
  background: var(--color-secondary);
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
    color: var(--font-color);
    font-size: 1.5em;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: auto;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 40px;
  width: 40px;
  left: 0px;
  bottom: 4px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: 0.4s;
  background: var(--color-secondary) url('https://i.ibb.co/7JfqXxB/sunny.png');
  box-shadow: 0 0px 15px #2020203d;
  background-repeat: no-repeat;
  background-position: center;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(24px);
  background: var(--color-secondary) url('https://i.ibb.co/FxzBYR9/night.png');
  background-repeat: no-repeat;
  background-position: center;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
