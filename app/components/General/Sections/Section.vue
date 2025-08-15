<script lang="ts" setup>
import { ChevronRight, ChevronLeft } from 'lucide-vue-next';
import { computed } from 'vue';

const errorStore = useErrorStore();
const stateStore = useStateStore();

const props = defineProps({
  header: {
    required: true,
    type: String
  },
  products: {
    // required: true,
    type: Array
  },
  sectionLink: {
    required: true,
    type: String
  }
})

/*
  :title="product['title']"
  :price="product['price']"
  :image="product['image']"
  :link="product['link']"
  :redirect="product['redirect']"
*/

const checkWrapper = computed(() => !errorStore.productErrorStatus);
const checkLoadState = computed(() => stateStore.productLoad);


</script>

<template>
  <div class="section-wrapper">
    <div class="link-scroll-wrapper">
      <NuxtLink :to="`/deals/${props.sectionLink}`" class="header-link">
        <span class="geist-medium">{{ props.header }}</span>
        <div class="chevron-icon">
          <ChevronRight
            :size="20"
            :stroke-width="2.25"
            absoluteStrokeWidth
          />
        </div>
      </NuxtLink>
      <div class="scroll-wrapper">
        <button class="scroll-back">
          <ChevronLeft
            :size="20"
            :stroke-width="2"
            absoluteStrokeWidth
            class="scroll-icon"
          />
        </button>
        <button class="scroll-forward">
          <ChevronRight
            :size="20"
            :stroke-width="2"
            absoluteStrokeWidth
            class="scroll-icon"
          />
        </button>
      </div>
    </div>
    <div class="product-wrapper" v-if="checkWrapper == true" >
      <GeneralReusablesProductCard
        v-if="checkLoadState == false"
        v-for="product in props.products"
        :key="product"
        :title="product.name"
        :image="product.properties.images[0].url"
        price="$209"
        size="small"
      />
      <GeneralReusablesLoadersSkeletonProductCard 
        v-if="checkLoadState == true"
        v-for="num in 6"
        :key="num"
      />
    </div>
    <div class="product-wrapper-error" v-if="checkWrapper == false">
      <span class="geist-medium">An error occured while fetching products</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  //scroll-behaviour: smooth;
  .link-scroll-wrapper {
    width: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scroll-wrapper {
      display: flex;
      align-items: center;
      column-gap: 10px;
      button {
        border: 1px solid rgba(128, 128, 128, 0.2);
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: 0;
      }
    }
    .header-link {
      text-decoration: none;
      display:flex;
      column-gap: 10px;
      width: fit-content;
      cursor: pointer;
      .chevron-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #121212;
        transition: 0.1s ease-in;
      }
      span {
        font-size: 20px;
        letter-spacing: -1px;
        color: #121212;
        transition: 0.1s ease-in;
      }
    }
    .header-link:hover {
      span {
        color: rgba(18, 18, 18, 0.8);
      }
      .chevron-icon {
        color: rgba(18, 18, 18, 0.8);
      }
    }
  }
  .product-wrapper {
    display: flex;
    align-items: center;
    column-gap: 25px;
    overflow-x: scroll;
    scrollbar-width: none;
    //border: 1px solid black;
  }
  .product-wrapper-error {
    display: flex;
    align-items: center;
    justify-content: center;
    width: stretch;
    height: 100px;
    // border: 1px solid black;
  }
}
</style>