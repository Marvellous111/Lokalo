import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useErrorStore } from '~/stores/errorstore';

export const useStateStore = defineStore(
  'useStateStore',
  () => {
    const locationReady = ref<{
      ran: boolean,
      error: boolean
    }>({
      ran: false,
      error: true 
    })

    function changeLocationReady(ran_arg: boolean, error_arg: boolean) {
      locationReady.value = {
        ran: ran_arg,
        error: error_arg
      }
    }

    const carouselImagesReady = ref<{
      ready: boolean,
      error: boolean
    }>({
      ready: false,
      error: true
    });

    function changeCarouselImagesReady(ready_arg: boolean, error_arg: boolean) {
      carouselImagesReady.value = {
        ready: ready_arg,
        error: error_arg
      }
    }

    return {
      locationReady, changeLocationReady, carouselImagesReady, changeCarouselImagesReady
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    }
  }
)