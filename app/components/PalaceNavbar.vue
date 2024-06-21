<script setup lang="ts">
import { LucideSearch, LucideShoppingCart } from 'lucide-vue-next'
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <LucideSearch class="cursor-pointer" />
    </div>
    <div>
      <NuxtLink to="/">
        <h1 class="text-4xl">PALACE</h1>
      </NuxtLink>
    </div>
    <div>
      <LucideShoppingCart class="cursor-pointer" />
    </div>
  </div>
</template>
