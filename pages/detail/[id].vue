<template>
  <div class="p-5">
    <h1 class="text-2xl">{{ data?.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="data?.content" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = useFetch(`/api/post/${route.params.id}`);
</script>
