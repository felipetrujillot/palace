<script setup lang="ts">
useHead({
  title: `PALACE`,
  meta: [{ name: 'description', content: 'tienda' }],
})

definePageMeta({
  layout: 'clean-layout',
  middleware: 'rootauth',
})

type ProductsList = {
  id_product_company: number
  product_name: string
  product_href: string
  picture_url: string
  price: number
}
/**
 *
 */
const products: ProductsList[] = [
  {
    id_product_company: 861,
    product_name: 'Keyboard Pin',
    product_href: 'keyboard-pin',
    picture_url:
      'https://www.lttstore.com/cdn/shop/files/KeyboardPins2000px-6.jpg?v=1717802778&width=1206',
    price: 1000,
  },

  {
    id_product_company: 128,
    product_name: 'Retro Screwdriver',
    product_href: 'retro-screwdriver',
    picture_url:
      'https://www.lttstore.com/cdn/shop/files/lttstore_RetroScrewdriver_TransparencyFile.png?v=1706132339&width=720',
    price: 1000,
  },
  {
    id_product_company: 127,
    product_name: 'Screwdriver bit set',
    product_href: 'screwdriver-bit-set',
    picture_url:
      'https://www.lttstore.com/cdn/shop/products/StandardBitSet_lttstoreImage-01_1.png?v=1668644732&width=720',
    price: 1000,
  },
  {
    id_product_company: 16,
    product_name: 'Threads Board',
    product_href: 'threads-board',
    picture_url:
      'https://i.kickstarter.com/assets/045/186/274/76e8ea680c451ef310d66f5fd81ee554_original.png?fit=scale-down&origin=ugc&width=680&sig=ii8EESazMYwnmRVD8K9MAoYvYdmbD4XwW3Vv1%2FSYZg0%3D',
    price: 1000,
  },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
    <div v-for="(p, k) in products" :key="k">
      <NuxtLink :to="`/producto/${p.id_product_company}`" class="space-y-4">
        <Card class="p-0 bg-muted cursor-pointer border-none">
          <img
            :src="p.picture_url"
            class="rounded-lg"
            lazy
            style="
              max-height: 50vh;
              min-height: 50vh;
              object-fit: cover;
              width: 100%;
            "
          />
        </Card>
        <div class="cursor-pointer">
          <h1 class="capitalize text-center text-2xl">
            {{ p.product_name }}
          </h1>
          <h1
            class="capitalize text-center font-bold text-2xl text-muted-foreground"
          >
            {{ clpFormat(p.price) }}
          </h1>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
