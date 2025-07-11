<script setup lang="ts">
const { data = [], type = 'course' } = defineProps<{
  title: string
  data?: any[]
  type?: 'course' | 'column'
}>()
</script>

<template>
  <div class="mb-6">
    <h3 class="text-2xl font-bold">
      {{ title }}
    </h3>
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
      <n-grid-item v-for="item in data" :key="item.id">
        <Prod :data="item" :type="type" />
      </n-grid-item>
    </n-grid>
  </div>
</template>
