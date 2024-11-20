<script setup lang="ts">
import { useWebSocket } from '@/test2/websoket';

const { buttons } = useWebSocket();
</script>

<template>
  <div class="about">
    <h1>Test 2</h1>
    <h2>We can update reactive values with throttling, which will reduce the frequency of updates. This approach
      minimizes excessive DOM updates and resolves the issue of handling a high volume of messages.</h2>

    <ul class="buttons">
      <li v-for="button in buttons" :key="button.id">
        {{ button.title }}
      </li>
    </ul>
  </div>
</template>

