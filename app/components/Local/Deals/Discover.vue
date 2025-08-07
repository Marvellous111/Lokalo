<script lang="ts" setup>
import { computed, watch, ref } from 'vue';

const images = ref<Array>([]);
const locStore = useLocStore();
const errorStore = useErrorStore();
const stateStore = useStateStore();
// Here the useState will be brought for the app to know whether to run or not.
// So we will either watch or compute for the state layoutReady

const canRunPageFunction = computed(() => stateStore.locationReady.ran && !stateStore.locationReady.error)

const handleQlooService = (suggestions: any[]) => {
  stateStore.changeCarouselImagesReady(true, true)
  if (images.value.length > 1) {
    images.value.length = 0; // There should be a way to flush value of arrays, check online!!!
  }
  for (let i=0; i < suggestions.length; i++) {
    images.value.push(suggestions[i].properties.images[0].url)
  }
  stateStore.changeCarouselImagesReady(true, false)
}


watch(canRunPageFunction, async (value) => {
  if (value) {
    try {
      const { hotels } = useQlooServices();
      var sug = ref<Array|null>(null);
      const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng }
      sug.value = await hotels(location_data, locStore.city, 3)
      handleQlooService(sug.value)
      stateStore.changeCarouselImagesReady(true, false)
    } catch(error) {
      stateStore.changeCarouselImagesReady(true, true)
      console.log(`An error occured, please try again later: ${error}`)
    }
  }
}, { immediate: true })


</script>

<template>
  <div class="discover-wrapper">
    <section class="discover-left-wrapper">
      <div class="texts-wrapper">
        <span class="discover-text geist-medium">
          Discover the Best Deals Today
        </span>
        <span class="discover-sub-text geist-regular">
          Explore the best stays, dinning and stores around you picked for the day.
        </span>
      </div>
      <GeneralReusablesSearchDSearchBar @get-qloo-service="handleQlooService" />
    </section>
    <section class="deals-display">
      <LocalDiscoverDisplay :images="images" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.discover-wrapper {
  width: stretch;
  height: fit-content;
  display: flex;
  align-items: start;
  justify-content: space-between;
  .discover-left-wrapper {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    .texts-wrapper {
      width: 380px;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .discover-text {
        font-size: 52px;
        line-height: 58px;
        letter-spacing: -2px;
      }
      .discover-sub-text {
        font-size: 16px;
        letter-spacing: -0.4px;
      }
    }
  }
}
@include responsive(mobile) {
  .discover-wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .discover-left-wrapper {
      row-gap: 20px;
      .texts-wrapper {
        width: stretch;
        .discover-text {
          font-size: 32px;
          line-height: 34px;
        }
        .discover-sub-text {
          display: none;
        }
      }
    }
    .deals-display {
      margin-top: 20px;
    }
  }
}
</style>