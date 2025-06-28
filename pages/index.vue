<template>
  <div>
    index page
    <NuxtLink to="/detail/1" class="text-blue-500">Detail</NuxtLink>
    <n-button type="primary"> Primary </n-button>
    <div class="text-center">
      <div v-for="item in posts" :key="item.id" class="mb-2.5">
        <NuxtLink class="text-blue-500 text-2xl" :to="`/detail/${item.id}`">
          {{ item.title }}
        </NuxtLink>
        <p>{{ item.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = useFetch("/api/posts");
</script>
