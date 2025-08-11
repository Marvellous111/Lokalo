<script lang="ts" setup>
import { BedSingle, Utensils, Store, Search } from 'lucide-vue-next';

const locStore = useLocStore();
const errorStore = useErrorStore();
const stateStore = useStateStore();

const emits = defineEmits<{
  (e: 'get-qloo-service', suggestions: any[]): void
}>()
// Removing stores feature for now.

const search_type = ["Stays", "Dining"];
const selected_search_type = ref("Stays");
const search_placeholder = ref("Search for stays around you");

const { restaurants, hotels, stores } = useQlooServices();

const changeDisplayType = async (changed_search_type: string) => {
  stateStore.changeDisplayLoadState(true)
  selected_search_type.value = changed_search_type
  search_placeholder.value = `Search for ${changed_search_type} around you`
  var sug = ref<Array|null>(null);
  const location_data = { latitude: locStore.position.lat, longitude: locStore.position.lng };
  if (changed_search_type == 'Stays') {
    sug.value = await hotels(location_data, locStore.subdivision, 3)
  }else if (changed_search_type == 'Dining') {
    sug.value = await restaurants(location_data, locStore.subdivision, 3)
  }
  if (sug.value) {
    emits('get-qloo-service', sug.value)
    console.log(sug.value)
  }
  stateStore.changeDisplayLoadState(false)
}

</script>

<template>
  <div class="dsearch-wrapper">
    <div class="buttons-wrapper">
      <button
        v-for="type in search_type"
        :key="type"
        :class="['type-button', { notselected: selected_search_type !== type }, { selected: selected_search_type === type } ]"
        @click="changeDisplayType(type)"
      >
        <div class="type-icon-wrapper">
          <BedSingle
            v-if="type === 'Stays'"
            :stroke-width="1.75"
            :size="18"
            absoluteStrokeWidth
            class="type-icon"
          />
          <Utensils
            v-if="type === 'Dining'"
            :stroke-width="1.75"
            :size="18"
            absoluteStrokeWidth
            class="type-icon"
          />
          <!-- <Store
            v-if="type === 'Stores'"
            :stroke-width="1.75"
            :size="18"
            absoluteStrokeWidth
            class="type-icon"
          /> -->
        </div>
        <span class="geist-medium">{{ type }}</span>
      </button>
    </div>
    <div class="search-bar">
      <input type="text" class="geist-regular" :placeholder="search_placeholder" />
      <button class="search-enter-icon">
        <Search
          :stroke-width="2"
          :size="20"
          absoluteStrokeWidth
          class="search-icon"
        />
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.dsearch-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .buttons-wrapper {
    display: flex;
    column-gap: 15px;
    height: fit-content;
    button {
      cursor: pointer;
      border: 0;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 5px;
      height: 38px;
      min-width: 100px; 
      outline: 0;
      padding: 7.5px 20px;
      transition: 0.3s ease-in;
      .type-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #121212;
      }
      span {
        font-size: 14px;
        letter-spacing: -0.3px;
        color: #121212;
      }
    }
    .notselected {
      background: transparent;
    }
    .notselected:hover {
      background: rgba(220, 220, 220, 0.2);
    }
    .selected {
      background: #121212;
      .type-icon-wrapper {
        .type-icon {
          color: #FAFAFA;
        }
      }
      span {
        color: #FFFFFF;
      }
    }
  }
  .search-bar {
    //border: 1.5px solid #90ee90;
    border-radius: 48px;
    height: 48px;
    width: stretch;
    padding: 5px 10px 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 15px;
    background: rgba(230, 230, 230, 0.6);
    transition: 0.2s ease-in;
    button {
      border: 0;
      outline: 0;
      background: #90ee90;
      //background: #6ff56fff;
      height: 40px;
      width: 40px;
      border: 1px solid rgba(128, 128, 128, 0.2);
      border-radius: 50%;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-icon {
        color: #FFFFFF;
      }
    }
    input {
      height: stretch;
      width: stretch;
      border: 0;
      outline: 0;
      font-size: 15px;
      background: transparent;
      letter-spacing: -0.5px;
    }
    input::placeholder {
      color: rgba(18, 18, 18, 0.7);
    }
  }
  .search-bar:focus {
    background: transparent;
    border: 1px solid #90ee90;
  }
}
@include responsive(mobile) {
  .dsearch-wrapper {
    .search-bar {
      display: none;
    }
  }
}
</style>