<script setup lang="ts">
definePageMeta({
  layout: 'clean-layout',
  middleware: 'rootauth',
})

documentTitle('Pagar')
const payForm = ref({
  email: '',
})

const total = ref(1000)
</script>

<template>
  <div class="container-sm space-y-6">
    <div class="flex flex-col md:flex-row gap-12">
      <div class="basis-2/4">
        <div class="space-y-2">
          <Label>Correo Electrónico</Label>
          <Input placeholder="hola@ejemplo.cl" v-model="payForm.email" />
        </div>
      </div>

      <div class="basis-2/4">
        <div class="flex justify-between">
          <h1 class="text-total">TOTAL</h1>
          <h1 class="text-2xl">{{ clpFormat(total) }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
