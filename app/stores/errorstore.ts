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
      positionErrorStatus.value = !positionErrorStatus.value;
      positionErrorMessage.value = error_message;
    }

    function changeToastType(new_type: string|null) {
      toastType.value = new_type
    }

    return { toastType, positionErrorStatus, positionErrorMessage, changePositionErrorStatus, changeToastType } 
    // Is there a better way for this, like returning a const will return all of them? I think so

  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    }
  }
)
