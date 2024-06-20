<script setup lang="ts">
import { LucideTruck } from 'lucide-vue-next'
import DocumentTitle from '~/components/DocumentTitle.vue'
import PalaceNavbar from '~/components/PalaceNavbar.vue'

definePageMeta({
  layout: 'clean-layout',
})

const route = useRoute()
const { $trpc } = useNuxtApp()
const product_href = route.params.product_href as string

/**
 *
 */
const { data: product, pending } =
  await $trpc.products.getProductByName.useQuery({
    product_href: product_href,
  })
</script>

<template>
  <div class="container-sm space-y-6">
    <VueSkeleton v-if="pending" />
    <div class="flex flex-col md:flex-row gap-12" v-if="!pending && product">
      <DocumentTitle :title="product.product_name" />
      <div class="basis-3/5">
        <Card
          class="p-0 bg-muted border-none"
          style="min-height: 50vh; max-height: 50vh; width: 100%"
        >
          <img
            :src="product.picture_url"
            class="rounded-lg"
            style="
              max-height: 50vh;
              min-height: 50vh;
              object-fit: cover;
              width: 100%;
            "
          />
        </Card>
      </div>

      <div class="basis-2/5">
        <div class="space-y-4">
          <h1 class="text-4xl uppercase">{{ product.product_name }}</h1>
          <h1 class="capitalize font-bold text-2xl text-muted-foreground">
            {{ clpFormat(product.price) }}
          </h1>

          <div class="space-y-2">
            <Button class="w-full" variant="outline">Agregar a mi carro</Button>
            <Button class="w-full">Comprar Ahora</Button>
          </div>

          <div class="space-y-2">
            <h1 class="font-bold">Descripción</h1>
            <Card>
              <p>
                "KIOSK" DESIGN ON A BLACK HEAVYWEIGHT LANE 7 UNISEX FIT HOODIE.
              </p>

              <p>Material: PLA</p>
            </Card>
          </div>

          <div class="space-y-2">
            <h1 class="font-bold">Entrega</h1>
            <Card>
              <div class="flex justify-between">
                <div class="flex items-center gap-3">
                  <LucideTruck :size="20" />
                  <a>Despacho</a>
                </div>
                <p>Disponible</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
