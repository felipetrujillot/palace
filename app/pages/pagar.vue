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
  apellido: '',
  email: '',
  celular: '',
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
  apellido: false,
  celular: false,
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
  validaForm.value = {
    nombre: false,
    apellido: false,
    celular: false,
    email: false,
    comuna: false,
    calle: false,
    numero: false,
    region: false,
    detalle: false,
  }

  let hasError = false

  const {
    nombre,
    apellido,
    celular,
    email,
    comuna,
    calle,
    numero,
    region,
    detalle,
  } = payForm.value

  if (nombre.length === 0) {
    validaForm.value.nombre = true
    hasError = true
  }

  if (apellido.length === 0) {
    validaForm.value.apellido = true
    hasError = true
  }

  if (celular.length === 0) {
    validaForm.value.celular = true
    hasError = true
  }

  if (email.length === 0) {
    validaForm.value.email = true
    hasError = true
  }

  if (comuna.length === 0) {
    validaForm.value.comuna = true
    hasError = true
  }

  if (calle.length === 0) {
    validaForm.value.calle = true
    hasError = true
  }

  if (numero.length === 0) {
    validaForm.value.numero = true
    hasError = true
  }

  /*  if (region.length === 0) {
    validaForm.value.region = true
    hasError = true
  } */

  if (detalle.length === 0) {
    validaForm.value.detalle = true
    hasError = true
  }

  console.log(validaForm.value)
  return hasError
}

/**
 *
 */
const newPayment = async () => {
  isPaying.value = true
  const hasError = formHasError()
  if (hasError) {
    isPaying.value = false
    toast('warning', 'Debes completar los campos marcados')
    return
    //throw new Error('yaera la wea')
  }
  /**
   *
   */
  const params = {
    nombre: payForm.value.nombre,
    apellido: payForm.value.apellido,
    email: payForm.value.email,
    celular: payForm.value.celular,
    comuna: payForm.value.comuna,
    numero: payForm.value.numero,
    region: payForm.value.region,
    detalle: payForm.value.detalle,
    amount: useTotalCart(),
  }

  /**
   *
   */
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
            @focus="validaForm.nombre = false"
            :class="validaForm.nombre ? 'border-primary' : ''"
            placeholder="Mi nombre"
            v-model="payForm.nombre"
            type="text"
          />
        </div>

        <div class="space-y-2">
          <Label>Apellido</Label>
          <Input
            @focus="validaForm.apellido = false"
            :class="validaForm.apellido ? 'border-primary' : ''"
            placeholder="Mi apellido"
            v-model="payForm.apellido"
            type="text"
          />
        </div>

        <div class="space-y-2">
          <Label>Celular</Label>
          <Input
            @focus="validaForm.celular = false"
            :class="validaForm.celular ? 'border-primary' : ''"
            placeholder="+569 9999 9999"
            v-model="payForm.celular"
            type="text"
          />
        </div>

        <div class="space-y-2">
          <Label>Correo Electrónico</Label>
          <Input
            @focus="validaForm.email = false"
            :class="validaForm.email ? 'border-primary' : ''"
            placeholder="hola@ejemplo.cl"
            v-model="payForm.email"
            type="email"
          />
        </div>

        <div class="space-y-2">
          <Label>Región</Label>
          <Input disabled :placeholder="regiones[15].region" />
        </div>

        <div class="space-y-2">
          <Label>Comuna</Label>
          <div>
            <Select v-model="payForm.comuna">
              <SelectTrigger
                @focus="validaForm.email = false"
                :class="validaForm.email ? 'border-primary' : ''"
              >
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
          <Label>Calle</Label>
          <Input
            @focus="validaForm.calle = false"
            :class="validaForm.calle ? 'border-primary' : ''"
            placeholder="Av. Ejemplo"
            v-model="payForm.calle"
          />
        </div>

        <div class="space-y-2">
          <Label>Número</Label>
          <Input
            @focus="validaForm.numero = false"
            :class="validaForm.numero ? 'border-primary' : ''"
            placeholder="1234"
            v-model="payForm.numero"
          />
        </div>

        <div class="space-y-2">
          <Label>Detalle</Label>
          <Input
            @focus="validaForm.detalle = false"
            :class="validaForm.detalle ? 'border-primary' : ''"
            placeholder="Casa o Dpto"
            v-model="payForm.detalle"
          />
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
