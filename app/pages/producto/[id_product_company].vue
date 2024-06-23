<script setup lang="ts">
import { LucideTruck } from 'lucide-vue-next'
import type { GetProductByName } from '~~/server/trpc/routers/products'

definePageMeta({
  layout: 'clean-layout',
})

const route = useRoute()
const { $trpc } = useNuxtApp()
const id_product_company = parseInt(route.params.id_product_company as string)
const showSheet = useSheet()
/**
 *
 */
const { data: product, status } =
  await $trpc.products.getProductByName.useQuery({
    id_product_company: id_product_company,
  })

/**
 *
 * @param p
 */
const addProduct = (p: GetProductByName) => {
  if (!p) throw 'err'
  addUseCart({
    id_product: p.id_product!,
    id_product_company: p.id_product_company!,
    id_inventory: p.id_inventory!,
    inventory_qty: p.inventory_qty!,
    qty: p.qty!,
    name: p.name!,
    price: p.price!,
    granel: p.granel!,
    cost: p.cost!,
    url_picture: p.url_picture!,
  })
  showSheet.value = true
  //toast('ok', 'Se agregó el producto al carro')
}
</script>

<template>
  <VueSkeleton v-if="status === 'pending'" />
  <div
    class="flex flex-col md:flex-row gap-12"
    v-if="status === 'success' && product"
  >
    <DocumentTitle :title="product.name" />
    <div class="basis-3/5">
      <Card
        class="p-0 bg-muted border-none"
        style="min-height: 50vh; max-height: 50vh; width: 100%"
      >
        <img
          :src="product.url_picture"
          class="rounded-lg"
          style="
            max-height: 50vh;
            min-height: 50vh;
            object-fit: contain;
            width: 100%;
          "
        />
      </Card>
    </div>

    <div class="basis-2/5">
      <div class="space-y-4">
        <h1 class="text-4xl uppercase">{{ product.name }}</h1>
        <h1 class="capitalize font-bold text-2xl text-muted-foreground">
          {{ clpFormat(product.price) }}
        </h1>

        <div class="space-y-2">
          <Button
            class="w-full"
            variant="outline"
            @click.prevent="addProduct(product)"
            >Agregar a mi carro</Button
          >
          <Button class="w-full" @click.prevent="$router.push('/pagar')"
            >Comprar Ahora</Button
          >
        </div>

        <div class="space-y-2">
          <h1 class="font-bold">Descripción</h1>
          <Card>
            <p>
              {{ product.description }}
            </p>
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
</template>
