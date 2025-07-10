<script setup lang="ts">
const links = [{ label: '项目代码', href: '#' }, { label: '视频课程', href: '#' }]
</script>

<template>
  <div class="text-center bg-dark-400 text-white mt-auto">
    <div class="border-0 border-b  border-solid border-gray-700 ">
      <a v-for="item in links" :key="item.label" :href="item.href" class="p-2 text-inherit no-underline inline-block">{{ item.label }}</a>
    </div>
    <div class="py-2">
      Copyright&copy; 2025 by YCXT
    </div>
  </div>
</template>
