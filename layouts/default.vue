<script setup lang="ts">
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'
</script>

<template>
  <div class="bg-gray-100 min-w-[1024px] min-h-screen flex flex-col">
    <Header />
    <main class="container mx-auto">
      <slot />
    </main>
    <Footer />
  </div>
</template>
