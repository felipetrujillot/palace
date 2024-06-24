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

/**
 *
 */
const validaForm = ref({
  nombre: false,
  email: false,
  comuna: false,
  calle: false,
  numero: false,
  region: false,
  detalle: false,
})
/**
 *
 */
const formHasError = () => {
  return false
}

/**
 *
 */
const newPayment = async () => {
  isPaying.value = true
  const hasError = formHasError()
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
    amount: useTotalCart(),
  }
  const res = await $trpc.flow.newPayment.mutate(params)

  window.location.href = `${res.url}?token=${res.token}`
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-12">
    <div class="basis-2/4 space-y-6">
      <Card>
        <div class="space-y-2">
          <Label>Nombre</Label>
          <Input
            :class="validaForm.nombre ? 'border-primary' : ''"
            placeholder="Mi nombre"
            v-model="payForm.nombre"
          />
        </div>

        <div class="space-y-2">
          <Label>Correo Electrónico</Label>
          <Input
            :class="validaForm.email ? 'border-primary' : ''"
            placeholder="hola@ejemplo.cl"
            v-model="payForm.email"
          />
        </div>

        <div class="space-y-2">
          <Label>Región</Label>
          <Input disabled :placeholder="regiones[15].region" />
        </div>

        <div class="space-y-2">
          <Label>Comuna</Label>
          <div>
            <Select
              :class="validaForm.email ? 'border-primary' : ''"
              v-model="payForm.region"
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleciona una comuna" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de cuenta</SelectLabel>
                  <SelectItem
                    v-for="(r, k) in regiones[15].comunas"
                    :key="k"
                    :value="r"
                  >
                    {{ r }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <Label :class="validaForm.email ? 'border-primary' : ''">Calle</Label>
          <Input placeholder="Av. Ejemplo" v-model="payForm.calle" />
        </div>

        <div class="space-y-2">
          <Label :class="validaForm.email ? 'border-primary' : ''"
            >Número</Label
          >
          <Input placeholder="1234" v-model="payForm.numero" />
        </div>

        <div class="space-y-2">
          <Label :class="validaForm.email ? 'border-primary' : ''"
            >Detalle</Label
          >
          <Input placeholder="Casa o Dpto" v-model="payForm.detalle" />
        </div>
      </Card>
    </div>

    <div class="basis-2/4">
      <Card>
        <CartComponent />

        <div class="flex justify-between">
          <h1 class="text-2xl">TOTAL</h1>
          <h1 class="text-2xl">{{ clpFormat(useTotalCart()) }}</h1>
        </div>

        <Button class="w-full" :disabled="isPaying" @click="newPayment()"
          >Continuar con el Pago</Button
        >

        <div class="flex justify-end">
          <h1 class="text-end text-sm">Métodos de pago:</h1>
        </div>

        <div class="flex justify-end items-end">
          <div class="space-y-4">
            <img
              width="200"
              src="https://vantek.vtexassets.com/arquivos/ids/168043"
            />
            <img
              width="200"
              style="
                filter: contrast(0) brightness(0.9) invert(1);
                object-fit: contain;
              "
              src="https://sandbox.flow.cl/images/header/logo-flow.svg"
            />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
