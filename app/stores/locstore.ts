// This store serves as the primary place for storing location data gotten from the user
// In the future this should be passed off to the backend and tied to the user in a cache.
// The data stored here should be encrypted as you would a password for safe keeping.

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocStore = defineStore(
  'locStore',
  () => {

    const targetLanguage = ref<string|null>(null);
    const position = ref<{
      lat: number,
      lng: number
    }|null>(null);

    const country = ref<string|null>(null);
    const city = ref<string|null>(null);
    const subdivision = ref<string|null>(null);

    function saveTargetLang(targetlang: string) {
      targetLanguage.value = targetlang
    }

    function saveLocCoords(savedpos: { lat: number, lng: number }, savedcountry: string, savedcity: string, savedsub: string) {
      position.value = savedpos
      country.value = savedcountry
      city.value = savedcity
      subdivision.value = savedsub
    }

    function saveOnlyPos(savedpos: { lat: number, lng: number }) {
      position.value = savedpos
    }

    return { targetLanguage, saveTargetLang, position, saveLocCoords, country, city, subdivision, saveOnlyPos }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(
        {
          secure: true,
        }
      ),
      pick: ['city', 'country', 'subdivision', 'position', 'targetLanguage']
    }
  },
)