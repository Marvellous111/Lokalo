<script lang="ts" setup>
import { Search } from 'lucide-vue-next';
</script>

<template>
  <div class="search-bar">
    <input type="text" class="geist-regular" placeholder="Search for stays, diners and stores around you" />
    <button class="search-enter-icon">
      <Search
        :stroke-width="2"
        :size="20"
        absoluteStrokeWidth
        class="search-icon"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
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
</style>