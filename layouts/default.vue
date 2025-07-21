<template>
  <div class="bg-gray-100 lg:min-w-[1024px] min-h-screen flex flex-col">
    <Header />
    <main class="container mx-auto">
      <slot />
    </main>
    <Footer />
  </div>
</template>
