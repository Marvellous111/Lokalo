<script lang="ts" setup>
</script>

<template>
  <div to="/" class="product-card-wrapper">
    <div class="image-wrapper">
    </div>
    <div class="title">
    </div>
    <div class="price-rating">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card-wrapper {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  position: relative;
  width: 175px;
  overflow: hidden;
  border-radius: 15px 15px 0px 0px;
  &::before {
    animation: loading 1.5s linear infinite;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.6), rgba(255, 255, 255, 0));
    content: '';
    height: 300px;
    left: -50px;
    position: absolute;
    top: 0;
    width: 90px;
    filter: blur(5px);
  }
  .image-wrapper {
    border-radius: 15px;
    width: 175px;
    height: 175px;
    //border: 1px solid black;
    background: rgba(128, 128, 128, 0.4);
    box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.1);
    overflow: hidden;
  }
  .title {
    width: stretch;
    text-align: left;
    //display: flex;
    align-items: center;
    height: fit-content;
    display: -webkit-box; /* Enables the flexbox-based layout */
    -webkit-line-clamp: 1; /* Limits text to 1 lines */
    -webkit-box-orient: vertical; /* Specifies vertical orientation */
    overflow: hidden; 
    width: 100px;
    height: 16px;
    border-radius: 15px;
    box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.1);
    background: rgba(128, 128, 128, 0.4);
  }
  .price-rating {
    display: flex;
    width: 50px;
    text-align: left;
    align-items: center;
    height: 12px;
    border-radius: 10px;
    box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.1);
    background: rgba(128, 128, 128, 0.4);
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