<template>
  <div class="bg-neutral-50 dark:bg-black min-h-screen min-w-screen">
    <div class="py-5 space-y-6">
      <div class="container-sm px-8">
        <PalaceNavbar />
      </div>
      <div class="container-sm space-y-6 px-8">
        <slot />
      </div>
      <div class="container-sm px-8">
        <PalaceFooter />
      </div>
    </div>
  </div>
</template>
