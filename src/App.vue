<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Test 1</RouterLink>
      <RouterLink to="/test2">Test 2</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
