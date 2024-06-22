<script setup lang="ts">
const { $trpc } = useNuxtApp()
import { regiones } from './regiones'
documentTitle('Pagar')

definePageMeta({
  layout: 'clean-layout',
  middleware: 'rootauth',
})

const isPaying = ref(false)

/**
 *
 */
const payForm = ref({
  nombre: '',
  email: '',
  comuna: '',
  calle: '',
  numero: '',
  region: '',
  detalle: '',
})

const total = ref(1000)

/**
 *
 */
const validaForm = () => {
  return false
}

/**
 *
 */
const newPayment = async () => {
  isPaying.value = true
  const hasError = validaForm()
  if (hasError) {
    throw new Error('yaera la wea')
  }
  const params = {
    nombre: payForm.value.nombre,
    email: payForm.value.email,
    comuna: payForm.value.comuna,
    numero: payForm.value.numero,
    region: payForm.value.region,
    detalle: payForm.value.detalle,
  }
  const res = await $trpc.flow.newPayment.mutate(params)

  window.location.href = `${res.url}?token=${res.token}`
}

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
  {
    product_name: 'Threads Board',
    product_href: 'threads-board',
    picture_url:
      'https://i.kickstarter.com/assets/045/186/274/76e8ea680c451ef310d66f5fd81ee554_original.png?fit=scale-down&origin=ugc&width=680&sig=ii8EESazMYwnmRVD8K9MAoYvYdmbD4XwW3Vv1%2FSYZg0%3D',
    price: 1000,
  },
]
</script>

<template>
  <div class="flex flex-col md:flex-row gap-12">
    <div class="basis-2/4 space-y-6">
      <Card>
        <div class="space-y-2">
          <Label>Nombre</Label>
          <Input placeholder="Mi nombre" v-model="payForm.nombre" />
        </div>

        <div class="space-y-2">
          <Label>Correo Electrónico</Label>
          <Input placeholder="hola@ejemplo.cl" v-model="payForm.email" />
        </div>

        <div class="space-y-2">
          <Label>Región</Label>
          <Input disabled :placeholder="regiones[15].region" />
        </div>

        <div class="space-y-2">
          <Label>Comuna</Label>
          <div>
            <Select v-model="payForm.region">
              <SelectTrigger>
                <SelectValue placeholder="Seleciona una comuna" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de cuenta</SelectLabel>
                  <SelectItem
                    v-for="(r, k) in regiones[15].comunas"
                    :key="k"
                    :value="k.toString()"
                  >
                    {{ r }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <Label>Calle</Label>
          <Input placeholder="Av. Ejemplo" v-model="payForm.calle" />
        </div>

        <div class="space-y-2">
          <Label>Número</Label>
          <Input placeholder="1234" v-model="payForm.numero" />
        </div>

        <div class="space-y-2">
          <Label>Detalle</Label>
          <Input placeholder="Casa o Dpto" v-model="payForm.detalle" />
        </div>
      </Card>
    </div>

    <div class="basis-2/4">
      <Card>
        <div class="border-b py-2" v-for="(p, k) in products" :key="k">
          <div class="flex justify-between gap-4">
            <p class="text-lg line-clamp-1 flex">fsdfds</p>
            <p class="text-lg">$2.990&nbsp;</p>
          </div>
        </div>

        <div class="flex justify-between">
          <h1 class="text-2xl">TOTAL</h1>
          <h1 class="text-2xl">{{ clpFormat(total) }}</h1>
        </div>

        <Button class="w-full" :disabled="isPaying" @click="newPayment()"
          >Continuar con el Pago</Button
        >

        <div class="flex justify-end">
          <div>
            <h1 class="text-end text-sm">Métodos de pago:</h1>

            <img
              width="200"
              src="https://vantek.vtexassets.com/arquivos/ids/168043"
            />
            <!-- <img
              width="200"
              style="filter: contrast(0) brightness(0) invert(1)"
              src="https://sandbox.flow.cl/images/header/logo-flow.svg"
            /> -->
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
