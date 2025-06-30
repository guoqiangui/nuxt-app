<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <h1 class="text-2xl text-center py-2.5">
      出了点错 - {{ error?.statusCode }}
    </h1>
    <n-empty description="你什么也找不到">
      <template #extra>
        <n-button size="small" @click="handleError"> 看看别的 </n-button>
      </template>
    </n-empty>
  </div>
</template>
