<script lang="ts" setup>
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  price: {
    //required: true,
    type: String,
  },
  image: {
    //required: true,
    type: String
  },
  link: {
    //required: true,
    type: String
  },
  redirect: {
    //required: true,
    type: String
  }
})

// The link in props does not mean the link to the website,
// it means our link to which we display more information and then link to the website

</script>

<template>
  <NuxtLink to="/" class="product-card-wrapper">
    <div class="image-wrapper">
      <img class="product-image" :src="props.image" />
    </div>
    <div class="title">
      <span class="geist-medium">{{ props.title }}</span>
    </div>
    <div class="price-rating">
      <span class="geist-medium">{{ props.price }} for 1 night</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.product-card-wrapper {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  position: relative;
  width: 175px;
  border-radius: 15px 15px 0px 0px;
  .image-wrapper {
    border-radius: 15px;
    width: 175px;
    height: 175px;
    //border: 1px solid black;
    box-shadow: 0.4px 0.2px 6px 1px rgba(18, 18, 18, 0.1);
    overflow: hidden;
    .product-image {
      object-fit: cover;
      object-position: center 40%;
      height: 100%;
      width: 100%;
    }
  }
  .title {
    width: stretch;
    text-align: left;
    //display: flex;
    align-items: center;
    height: fit-content;
    display: -webkit-box; /* Enables the flexbox-based layout */
    -webkit-line-clamp: 1; /* Limits text to 1 lines */
    -webkit-box-orient: vertical; /* Specifies vertical orientation */
    overflow: hidden; 
    span {
      letter-spacing: -0.4px;
      color: #121212;
      font-size: 15px;
    }
  }
  .price-rating {
    display: flex;
    width: stretch;
    text-align: left;
    align-items: center;
    height: fit-content;
    span {
      font-size: 12px;
      color: rgba(18, 18, 18, 0.7);
      //color: #121212;
    }
  }
}
</style>