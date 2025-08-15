<script lang="ts" setup>
const route = useRoute();

const routename = route.params.category;

function toTitleCase(str: any) {
  return str.toLowerCase().split(' ').map((word: any) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

const titled_routename = toTitleCase(routename);

useSeoMeta({
  title: `Lokalo | ${titled_routename} for the best local experience`
})

// Usually we would want to store this in a cache for faster load times right?? check it well

const locStore = useLocStore();
const errorStore = useErrorStore();
const stateStore = useStateStore();

const deals = ref([]);
const canPageFunctionRun = computed(() => stateStore.locationReady.ran && !stateStore.locationReady.error)

const getDeals = async() => {
  try {
    if (titled_routename == 'Stays') {
      errorStore.changeProductErrorStatus(null)
      console.log("Getting stays")
      const { hotels } = useQlooServices();
      const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
      const gotten_deals = await hotels(location_data, locStore.subdivision, 33)
      deals.value = gotten_deals
      console.log(deals.value)
    }else if (title_routename == 'Dining') {
      errorStore.changeProductErrorStatus(null)
      const { restaurants } = useQlooServices();
      const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
      const gotten_deals = await restaurants(location_data, locStore.subdivision, 33)
      deals.value = gotten_deals
    } 
  } catch(error) {
    errorStore.changeProductErrorStatus("Cannot get deals")
    console.log(error)
  }
}

watch(canPageFunctionRun, async (newValue) => {
  if (newValue) {
    stateStore.changeProductLoadState(true)
    try {
      await getDeals()
      console.log("Gotten deals")
      stateStore.changeProductLoadState(false)
    } catch(error) {
      console.log(`An error occurred: ${error}`)
      stateStore.changeProductLoadState(false)
    }
  }
}, { immediate: true })

const checkWrapper = computed(() => !errorStore.productErrorStatus);
const checkLoadState = computed(() => stateStore.productLoad);

</script>


<template>
  <div class="deals-section-wrapper">
    <section class="category-section">
      <GeneralReusablesProductCard
        v-if="checkLoadState == false"
        v-for="deal in deals"
        :key="deal"
        :title="deal.name"
        :image="deal.properties.images[0].url"
        price="$209"
        size="large"
      />
      <GeneralReusablesLoadersSkeletonProductCard 
        v-if="checkLoadState == true"
        v-for="num in 27"
        :key="num"
        size="large"
      />
    </section>
    <section class="map-section"></section>
  </div>
</template>

<style lang="scss" scoped>
.deals-section-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: stretch;
  width: stretch;
  // border: 1px solid blue;
  .category-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns, adjust number as needed */
    grid-template-rows: repeat(2); /* 2 rows with 100px height each, adjust as needed */
    gap: 20px;
    width: fit-content;
    // border: 1px solid black;
    // margin: 0 auto;
  }
  .map-section {
    position: fixed;
    background: #fafafa;
    border: 1px solid rgba(128, 128, 128, 0.2);
    height: 500px;
    width: 500px;
    border-radius: 40px;
    top: 120px;
    right: 70px;
    margin-right: 0px;
  }
}
</style>