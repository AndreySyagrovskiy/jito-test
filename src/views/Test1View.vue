<script setup lang="ts">
import { useProductsList } from '@/test1/products';
const { products, isLoading, fetchNextPage, addNewProduct, refetchProducts } = useProductsList();

async function scroll(event: Event) {
  const target = event.target as HTMLElement;

  if (isLoading.value === false && target.scrollHeight - target.scrollTop - 50 < target.clientHeight) {
    await fetchNextPage.value();
  }
}
</script>

<template>
  <div class="about">
    <h1>Test 1</h1>
    <button @click="addNewProduct">add new product</button>
    <button @click="refetchProducts">refetch</button>
    <ul class="products" @scroll="scroll">
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.products {
  height: 300px;
  overflow-y: auto;
}
</style>

