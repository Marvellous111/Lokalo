<script lang="ts" setup>
import { X } from 'lucide-vue-next';


const props = defineProps({
  error_message: {
    type: String
  },
  error_function_message: {
    type: String
  }
})

const emit = defineEmits<{
  (e: 'close_toast'): void,
  (e: 'error_function'): void
}>()

const closeToast = () => {
  emit('close_toast')
}

const useParentFunction = async () => {
  emit('error_function')
}

</script>

<template>
  <div class="toast-wrapper">
    <div class="toast-container">
      <!-- <button class="close-toast-button" @click="closeToast">
        <X :stroke-width="1.5" :size="18" absoluteStrokeWidth class="close-icon" />
      </button> -->
      <div class="image">Image</div>
      <span class="error-message geist-medium">{{ props.error_message }}</span>
      <button class="error-function-button" @click="useParentFunction">
        <span class="geist-medium">{{ props.error_function_message }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast-wrapper {
  width: stretch;
  height: stretch;
  background: rgba(18, 18, 18, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .toast-container {
    box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.3);
    background: #FFFFFF;
    width: 325px;
    //height: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 15px;
    padding: 7.5px;
    border-radius: 15px;
    position: relative;
    .close-toast-button {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      padding: 2.5px;
      background: transparent;
      border: 0;
      outline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      cursor: pointer;
      top: 2.5px;
      right: 2.5px;
    }
    .image {
      height: 150px;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(128, 128, 128, 0.7);
      border-radius: 7.5px;
    }
    .error-message {
      font-size: 20px;
      text-align: center;
    }
    .error-function-button {
      height: 38px;
      width: stretch;
      border-radius: 7.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      background: #121212;
      outline: 0;
      border: 0;
      color: #FFFFFF;
      cursor: pointer;
      span {
        font-size: 15px;
        text-align: center;
        letter-spacing: -0.5px;
      }
    }
  }
}
</style>