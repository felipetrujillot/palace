<script setup lang="ts">
import { LucideSearch, LucideShoppingCart } from 'lucide-vue-next'

/**
 *
 */
const showSheet = useSheet()

/**
 *
 */
const cart = useCart()
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <LucideSearch class="cursor-pointer" />
    </div>
    <div>
      <NuxtLink to="/">
        <h1 class="text-4xl">HEADER</h1>
      </NuxtLink>
    </div>
    <div class="flex gap-1 cursor-pointer" @click.prevent="showSheet = !showSheet">
      <LucideShoppingCart class="cursor-pointer" />
      <p>
        {{ cart?.length }}
      </p>
    </div>
  </div>

  <Sheet :open="showSheet">
    <SheetContent side="right" v-model:overlay="showSheet">
      <SheetHeader>
        <SheetTitle> Título </SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <div class="pt-4 pb-8 overflow-y-auto h-full space-y-4">
        <div class="flex flex-col h-full justify-between">
          <div>
            <CartComponent />
          </div>

          <div>
            <Button class="w-full" @click.prevent="$router.push('/pagar'), (showSheet = false)">Ir al Pago</Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
