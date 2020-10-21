<template lang="html">
  <div class="loading-page" v-if="loading">
    <svg
      class="spinner"
      width="90"
      height="90"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      data-svg="spinner"
    >
      <circle
        fill="none"
        cx="15"
        cy="15"
        r="14"
        style="stroke-width: 0.333333px;"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--color-secondary);
  z-index: 999;
}

.spinner {
  animation: rotate 1.4s linear infinite;

  circle {
    stroke-dasharray: 88px;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke: var(--font-color);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 88px;
  }
  50% {
    stroke-dashoffset: 22px;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 88px;
    transform: rotate(450deg);
  }
}
</style>
