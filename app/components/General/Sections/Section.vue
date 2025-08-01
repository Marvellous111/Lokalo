<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';
const props = defineProps({
  header: {
    required: true,
    type: String
  },
  products: {
    // required: true,
    type: Array
  },
  // sectionLink: {
  //   required: true,
  //   type: String
  // }
})

/*
  :title="product['title']"
  :price="product['price']"
  :image="product['image']"
  :link="product['link']"
  :redirect="product['redirect']"
*/
</script>

<template>
  <div class="section-wrapper">
    <NuxtLink to="" class="header-link">
      <span class="geist-medium">{{ props.header }}</span>
      <div class="chevron-icon">
        <ChevronRight
          :size="20"
          :stroke-width="2.25"
          absoluteStrokeWidth
        />
      </div>
    </NuxtLink>
    <div class="product-wrapper">
      <GeneralReusablesProductCard
        v-for="product in props.products"
        :key="product"
        :title="product.name"
        :image="product.properties.images[0].url"
        price="$209"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  //scroll-behaviour: smooth;
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
  .product-wrapper {
    display: flex;
    align-items: center;
    column-gap: 25px;
    overflow-x: scroll;
    scrollbar-width: none;
    //border: 1px solid black;
  }
}
</style>