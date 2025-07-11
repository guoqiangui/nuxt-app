<script setup lang="ts">
import type { Column, Course } from '~/server/database/generated/prisma/client'

defineProps<{
  data: Course | Column
  type: 'course' | 'column'
}>()
</script>

<template>
  <n-card>
    <template #header>
      <div class="truncate">
        {{ data.title }}
      </div>
    </template>
    <template #cover>
      <img :src="data.cover">
    </template>
    <div>
      <p>{{ data.desc }}</p>
    </div>
  </n-card>
</template>
