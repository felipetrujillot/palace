<script setup lang="ts">
import { LucideXCircle } from 'lucide-vue-next'

const cart = useCart()
</script>

<template>
  <template v-if="cart">
    <div class="border-b py-2" v-for="(p, k) in cart" :key="k">
      <div class="flex justify-between gap-4">
        <div class="flex gap-2 items-center">
          <img height="50" width="50" :src="p.url_picture" />
          <LucideXCircle
            class="cursor-pointer min-w-4 min-h-4 w-4 h-4"
            @click.prevent="removeProduct(p.id_product)"
          />
          <p class="text-lg line-clamp-1 flex">{{ p.name }}</p>
        </div>
        <div>
          <p class="text-lg text-end">{{ clpFormat(p.price) }}</p>
          <p class="text-sm text-end">Cantidad: {{ p.qty }}</p>
        </div>
      </div>
    </div>
  </template>
</template>
