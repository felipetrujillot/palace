<script setup lang="ts">
import type { ProductCart } from './composables/states'

/**
 *
 */
useHead({
  bodyAttrs: {
    class: 'dark',
  },
})

/**
 *
 */
onMounted(() => {
  const cart = useCart()
  const res = useCookie<ProductCart[]>('cart_cookie', {
    maxAge: 3600 * 24 * 365,
  })
  if (res.value) {
    /**
     * Pendiente validaciones del carro
     */
    cart.value = res.value
  }
})

const inputForm = ref({
  name: '',
})

const inputValidator = ref({
  name: false,
})

/**
 *
 */
const submitForm = () => {
  inputValidator.value.name = true
}

/**
 *
 */
const useError = () => {
  const refError = ref('ring-ring ring-offset-2 ring-2')
  return { refError }
}
</script>

<template>
  <div>
    <!--
    <div class="container-sm my-8 space-y-6">
      <Card>
        <Input
          :class="inputValidator.name ? 'border-primary' : ''"
          @focus="inputValidator.name = false"
          v-model="inputForm.name"
          placeholder="Name"
        />

        <Button @click.prevent="submitForm">Avance</Button>
      </Card>
    </div> -->
    <NuxtLayout>
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<style>
.container-sm {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
}

.container-xs {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 720px;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  animation: fade 0.3s ease-in-out;
}
.fadeInFast {
  animation: fade 0.2s ease-in-out;
}
</style>
