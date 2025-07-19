<script setup lang="ts">
import type { ApiResponse, CourseResponse } from '~/types/api'

const courses = ref<CourseResponse[]>([])

onMounted(async () => {
  const { $api } = useNuxtApp()
  const res = await $api<ApiResponse<CourseResponse[]>>('/api/purchased-course')
  courses.value = res.data
})
</script>

<template>
  <div class="bg-white p-4">
    <n-card v-for="course in courses" :key="course.id" class="mb-4">
      <div class="flex gap-4 items-center">
        <img class="w-80 h-45" :src="course.cover" alt="course">
        <div>
          <h3 class="text-lg font-bold">
            {{ course.title }}
          </h3>
          <n-button type="primary" @click="navigateTo(`/course/detail/${course.id}`)">
            继续学习
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>
