<script lang="ts" setup>

const images = ref<Array|null>(null);

const handleQlooService = (suggestions: any[]) => {
  // for (let i=0; i < suggestions.length; i++) {
  //   images.value.push(suggestions.properties.images[0].url)
  // }
  console.log(images.value)
}

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
      <!-- <LocalDiscoverDisplay /> -->
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
</style>