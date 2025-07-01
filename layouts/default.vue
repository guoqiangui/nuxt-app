<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div>
    <h1 class="flex justify-between items-center border border-b-black p-2.5">
      <span>导航栏</span>
      <div class="flex items-center">
        <div class="w-[50px] h-[50px] rounded-full bg-amber-700 mr-2" />
        启用暗黑模式：<n-switch v-model:value="config.theme.dark" />
      </div>
    </h1>
    <slot />
  </div>
</template>
