<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()

useHead({
  title: `PALACE`,
  meta: [{ name: 'description', content: 'tienda' }],
})

definePageMeta({
  middleware: 'rootauth',
})

type ProductsList = {
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
    product_name: 'Keyboard Pin',
    product_href: 'keyboard-pin',
    picture_url:
      'https://www.lttstore.com/cdn/shop/files/KeyboardPins2000px-6.jpg?v=1717802778&width=1206',
    price: 1000,
  },

  {
    product_name: 'Retro Screwdriver',
    product_href: 'retro-screwdriver',
    picture_url:
      'https://www.lttstore.com/cdn/shop/files/lttstore_RetroScrewdriver_TransparencyFile.png?v=1706132339&width=720',
    price: 1000,
  },
  {
    product_name: 'Screwdriver bit set',
    product_href: 'screwdriver-bit-set',
    picture_url:
      'https://www.lttstore.com/cdn/shop/products/StandardBitSet_lttstoreImage-01_1.png?v=1668644732&width=720',
    price: 1000,
  },
]
</script>

<template>
  <div class="container py-5 space-y-4">
    <PalaceNavbar />
    <div class="grid grid-cols-3 gap-4 items-stretch">
      <div v-for="(p, k) in products" :key="k" class="space-y-4">
        <NuxtLink :to="`/producto/${p.product_href}`">
          <Card class="p-0 bg-muted cursor-pointer">
            <img
              :src="p.picture_url"
              class="rounded-lg"
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

    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <div class="my-8">&nbsp;</div>
    <!-- FOOTER -->
    <PalaceFooter />
    <!-- FOOTER -->
  </div>
</template>
