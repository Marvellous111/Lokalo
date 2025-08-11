<script lang="ts" setup>
</script>

<template>
  <div class="discover-display">
  </div>
</template>

<style lang="scss" scoped>
.discover-display {
  height: 450px;
  width: 575px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 57px;
  position: relative;
  overflow: hidden;
  background: rgba(128, 128, 128, 0.4);
  box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.1);

  &::before {
    animation: loading 1.5s linear infinite;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.6), rgba(255, 255, 255, 0));
    content: '';
    height: 100%;
    left: -50px;
    position: absolute;
    top: 0;
    width: 200px;
    filter: blur(5px);
  }
}

@include responsive(mobile) {
  .discover-display {
    width: 350px;
    max-width: 400px;
    height: 375px;
    border-radius: 25px;
  }
}

@keyframes loading {
  0% {
    left: -50px;
  }
  100% {
    left: calc(100% + 50px);
  }
}
</style>