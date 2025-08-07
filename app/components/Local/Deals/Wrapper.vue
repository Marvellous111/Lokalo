<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import { Filter } from 'lucide-vue-next';

const select_types = ["Stays", "Dining"];
const selected_category_type = ref("Stays");
// Here the useState will be brought for the app to know whether to run or not.
// So we will either watch or compute for the state layoutReady
const stateStore = useStateStore();



const canRunPageFunction = computed(() => stateStore.locationReady.ran && !stateStore.locationReady.error);

const locStore = useLocStore();
const errorStore = useErrorStore();

console.log(errorStore.productErrorStatus)

const types_map = ref<Map<String|Array>>({ // correct this later
  "Stays": [],
  "Dining": [],
  "Stores": []
})

const getRestaurantRec = async () => {
  try {
    const { restaurants } = useQlooServices();
    const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
    const sug_res = await restaurants(location_data, locStore.city, 8)
    types_map.value["Dining"] = sug_res
    errorStore.changeProductErrorStatus(null)
  } catch(error) {
    errorStore.changeProductErrorStatus("Cannot get product")
    console.log(`An error occurred while getting diners`)
  }
}

const getHotelsRec = async () => {
  try {
    const { hotels } = useQlooServices();
    const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
    const sug_hot = await hotels(location_data, locStore.city, 8)
    types_map.value["Stays"] = sug_hot
    errorStore.changeProductErrorStatus(null)
  } catch(error) {
    console.log("Changing product error status to true")
    errorStore.changeProductErrorStatus("Cannot get product")
    console.log(`An error occurred while getting stays`)
  }
}

// const getStoresRec = async () => {
//   console.log("Getting recs for stores")
//   const { stores } = useQlooServices();
//   const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
//   const sug_str = await stores(location_data, locStore.city, 8)
//   types_map.value["Stores"] = sug_str
// }

const getTotalRec = async () => {
  try {
    await getRestaurantRec();
    await getHotelsRec();
  } catch(error) {
    console.log(`An error occurred: ${error}`)
  }
}


watch(canRunPageFunction, async (newValue) => {
  if (newValue) {
    try{
      await getTotalRec()
    } catch(error) {
      console.log(`An error occurred while watching: ${error}`)
    }
  }
}, { immediate: true })


</script>

<template>
  <section class="deals-wrapper">
    <!-- <div class="select-filter-wrapper">
      <div class="button-wrapper">
        <button
          v-for="types in select_types"
          :key="types"
          :class="[{ notselected: selected_category_type !== types }, { selected: selected_category_type === types } ]"
        >
        <span class="geist-semibold">{{ types }}</span>
        </button>
      </div>
      <button class="filter-button">
        <div class="filter-icon-wrapper">
          <Filter
            :size="14"
            :stroke-width="1.75"
            absoluteStrokeWidth
            class="filter-icon"
          />
        </div>
        <span class="geist-medium">Filters</span>
      </button>
    </div> -->
    <section class="selected-deals-wrapper">
      <GeneralSectionsSection
        v-for="type in select_types"
        :key="type"
        :header="`Best ${type} near you`"
        :products="types_map[type]"
      />
    </section>
  </section>
</template>


<style lang="scss" scoped>
.deals-wrapper {
  width: stretch;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  .select-filter-wrapper {
    display: flex;
    width: stretch;
    justify-content: space-between;
    align-items: center;
    .button-wrapper {
      display: flex;
      align-items: center;
      column-gap: 15px;
      button {
        display: flex;
        align-items: center;
        border: 0;
        border-radius: 20px;
        height: 38px;
        min-width: fit-content;
        //background: rgba(230, 230, 230, 0.6); 
        outline: 0;
        padding: 2.5px 15px;
        transition: 0.1s ease-in;
        span {
          font-size: 14px;
          letter-spacing: -0.6px;
          transition: 0.2s ease-in;
        }
      }
      .notselected {
        background: transparent;
      }
      .notselected:hover {
        span {
          color: rgba(18, 18, 18, 0.5);
        }
      }
      .selected {
        background: rgba(230, 230, 230, 0.6);
        span {
          color: #121212;
        }
      }
    }
    .filter-button {
      border: 1px solid rgba(210, 210, 210, 1);
      border-radius: 25px;
      display: flex;
      align-items: center;
      column-gap: 5px;
      height: 38px;
      min-width: fit-content;
      background: transparent; 
      outline: 0;
      padding: 2.5px 20px;
      transition: 0.1s ease-in;
      span {
        font-size: 15px;
        letter-spacing: -0.6px;
        color: rgba(18, 18, 18, 0.8);
        transition: 0.2s ease-in;
      }
      .filter-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .selected-deals-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
  }
}
</style>