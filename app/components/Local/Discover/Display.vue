<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    required: false,
    type: Array
  }
})

const deal_size = ref(0)
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

// Initialize deal_size based on images prop
const initCarousel = () => {
  deal_size.value = props.images.length
}

// Auto-advance to next image
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % deal_size.value
}

// Start auto-rotation
onMounted(() => {
  initCarousel()
  timer = setInterval(nextImage, 10000) // 10 seconds
})

// Cleanup timer on unmount
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="discover-display">
    <div class="image-wrapper">
      <img 
        v-for="(image, index) in props.images"
        :key="index"
        :src="image"
        class="image"
        :class="{ active: index === currentIndex, 'slide-up': index === currentIndex }"
      />
    </div>
    <div class="select-display-wrapper">
      <button 
        class="deal-display-button"
        v-for="num in deal_size"
        :key="num"
        :class="{ active: num - 1 === currentIndex }"
        @click="currentIndex = num - 1"
      ></button>
    </div>
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

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .image.active {
    opacity: 1;
    transform: translateY(0);
  }

  .image.slide-up {
    z-index: 1;
  }

  .select-display-wrapper {
    display: flex;
    width: 100%;
    padding: 0 40px;
    position: absolute;
    top: 10px;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    column-gap: 5px;

    .deal-display-button {
      flex: 1;
      height: 2.5px;
      background: #FFFFFF;
      border-radius: 5px;
      border: 0;
      outline: 0;
      opacity: 0.5;
      transition: opacity 0.3s ease;
      cursor: pointer;

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>