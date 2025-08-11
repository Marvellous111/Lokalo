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

    const productLoad = ref<boolean>(false);
    function changeProductLoadState(args: boolean) {
      productLoad.value = args
    }

    const displayLoad = ref<boolean>(false);
    function changeDisplayLoadState(args: boolean) {
      displayLoad.value = args
    }

    return {
      locationReady, changeLocationReady, carouselImagesReady, changeCarouselImagesReady,
      productLoad, changeProductLoadState, displayLoad, changeDisplayLoadState
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    }
  }
)