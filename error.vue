<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <NResult status="500" title="服务器错误" :description="error.message">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
  </div>
</template>
