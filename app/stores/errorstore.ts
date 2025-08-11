// This file is for errors gotten on the website, all errors will be stored here, stored in sessionstorage

import { defineStore } from 'pinia';
import { ref } from 'vue';

// We may need to define error types?? will look into it.

export const useErrorStore = defineStore(
  'errorstore',
  () => {
    // const positionError = () => {
    //   return {  }
    // } Will look into a syntax like this later
    const toastType = ref<string|null>(null);

    const positionErrorStatus = ref<boolean>(false);
    const positionErrorMessage = ref<string|null>(null);

    function changePositionErrorStatus(error_message: string|null) {
      if (error_message == null) {
        positionErrorStatus.value = false
      }else {
        positionErrorStatus.value = true;
      }
      positionErrorMessage.value = error_message;
    }

    function changeToastType(new_type: string|null) {
      toastType.value = new_type
    }

    const productErrorMessage = ref<String|null>(null);
    const productErrorStatus = ref<boolean>(true);

    function changeProductErrorStatus(error_message: string|null) {
      if (error_message == null) {
        productErrorStatus.value = false
      } else {
        productErrorStatus.value = true
      }
      productErrorMessage.value = error_message
    }

    return { toastType, positionErrorStatus, positionErrorMessage, changePositionErrorStatus, changeToastType, productErrorMessage, productErrorStatus, changeProductErrorStatus } 
    // Is there a better way for this, like returning a const will return all of them? I think so

  },
  // {
  //   persist: {
  //     storage: piniaPluginPersistedstate.cookies(),
  //   }
  // }
)
