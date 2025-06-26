<template>
  <div>detail page</div>
  <div>{{ route.params.id }}</div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
