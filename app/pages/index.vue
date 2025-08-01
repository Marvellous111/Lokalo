<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'


useSeoMeta({
  title: 'Lokalo | Stays, dinnings, shops and more for the best experience'
})



// const errorToast = ref<HTMLElement|null>(null);

// I just realised location data fetching could be a middleware thing that is tied to the store? 
// Do this in later versions after launch. 

// For now though, we can put this anywhere the default layout so we can use the section layout whenever we want??




/*

We can only have three toast types right? error and auth and info toast.
Each cannot exist at the same time?
*/


</script>

<template>
  <section class="index-wrapper">
    <!-- <section class="error-toast" ref="errorToast">
      <GeneralToastsError
        v-if="errorStore.positionErrorStatus == true"
        :error_message="errorStore.positionErrorMessage"
        error_function_message="Try again"
        @error_function="changeError"
      />
    </section> -->
    <section class="searchbar-mobile">
      <GeneralReusablesSearchBar />
    </section>
    <section class="discover-section">
      <LocalDealsDiscover />
    </section>
    <section class="deals-section">
      <LocalDealsWrapper />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.index-wrapper {
  height: stretch;
  width: stretch;
  display: flex;
  flex-direction: column;
  position: relative;
  row-gap: 50px;
  // .error-toast {
  //   z-index: 30;
  //   position: fixed;
  //   top: 0;
  //   left: -20px;
  //   width: stretch;
  //   height: stretch;
  //   visibility: hidden;
  //   opacity: 0;
  //   transition: visibility 0.3s ease-in, opacity 0.3s ease-in;
  // }
  .deals-section { 
    width: stretch;
  }
}
</style>