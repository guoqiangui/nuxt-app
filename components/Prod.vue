<script setup lang="ts">
import type { ColumnResponse, CourseResponse } from '~/types/api'

const props = defineProps<{
  data: CourseResponse | ColumnResponse
  type: 'course' | 'column'
}>()

function handleClick() {
  navigateTo(`/${props.type}/detail/${props.data.id}`)
}
</script>

<template>
  <n-card @click="handleClick">
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
