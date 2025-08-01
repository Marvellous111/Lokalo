<script lang="ts" setup>
import { Filter } from 'lucide-vue-next';
const select_types = ["Stays", "Dining"];
const selected_category_type = ref("Stays");

const locStore = useLocStore();
const errorStore = useErrorStore();

const types_map = ref<Map<String|Array>>({
  "Stays": [],
  "Dining": [],
  "Stores": []
})

const getRestaurantRec = async () => {
  console.log("Getting recs for diners")
  const { restaurants } = useQlooServices();
  const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
  const sug_res = await restaurants(location_data, locStore.city, 8)
  types_map.value["Dining"] = sug_res
}

const getHotelsRec = async () => {
  console.log("Getting recs for stays")
  const { hotels } = useQlooServices();
  const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
  const sug_hot = await hotels(location_data, locStore.city, 8)
  types_map.value["Stays"] = sug_hot
}

// const getStoresRec = async () => {
//   console.log("Getting recs for stores")
//   const { stores } = useQlooServices();
//   const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
//   const sug_str = await stores(location_data, locStore.city, 8)
//   types_map.value["Stores"] = sug_str
// }

onMounted(async () => {
  try {
    await getRestaurantRec()
    await getHotelsRec()
    // await getStoresRec()
  } catch(error) {
    console.error(`An error occurred for recommending diners: ${error}`)
  }
})

/*
How do we want to play this right now:
We can say:
{
  "Stays": [],
  "Dinning": [],
  "Stores": []
}
*/





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