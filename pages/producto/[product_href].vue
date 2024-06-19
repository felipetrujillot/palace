<script setup lang="ts">
import DocumentTitle from '~/components/DocumentTitle.vue'

definePageMeta({
  layout: 'clean-layout',
})

const route = useRoute()
const { $trpc } = useNuxtApp()
const product_href = route.params.product_href as string

const { data: product, pending } =
  await $trpc.products.getProductByName.useQuery({
    product_href: product_href,
  })
/* const product = {
  product_name: 'KEYBOARD PIN',
  picture_url:
    'https://www.lttstore.com/cdn/shop/files/KeyboardPins2000px-6.jpg?v=1717802778&width=1206',
  price: 1000,
} */
</script>

<template>
  <div class="container-sm">
    <VueSkeleton v-if="pending" />
    <div class="flex flex-col md:flex-row gap-12" v-if="!pending && product">
      <DocumentTitle :title="product.product_name" />
      <div class="basis-3/5">
        <Card class="p-0 bg-muted">
          <img
            :src="product.picture_url"
            class="rounded-lg"
            style="max-height: 50vh; object-fit: cover; width: 100%"
          />
        </Card>
      </div>

      <div class="basis-2/5">
        <div class="space-y-2">
          <h1 class="text-4xl uppercase">{{ product.product_name }}</h1>
          <h1 class="capitalize font-bold text-2xl text-muted-foreground">
            {{ clpFormat(product.price) }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
