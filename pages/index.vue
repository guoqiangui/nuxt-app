<script setup lang="ts">
useHead({
  title: '首页',
})

const slides = [
  { label: '1', bgColor: 'cadetblue' },
  { label: '2', bgColor: 'cornflowerblue' },
  { label: '3', bgColor: 'blueviolet' },
  { label: '4', bgColor: 'brown' },
]

// 为了看到loading，不能await useFetch
const { data: indexData, pending } = useFetch('/api/index-data')
</script>

<template>
  <Loading :pending="pending">
    <div class="py-5 md:py-10">
      <n-carousel autoplay class="mb-6">
        <div v-for="item in slides" :key="item.label" class="h-[200px] md:h-[400px] rounded-2xl flex items-center justify-center" :style="{ backgroundColor: item.bgColor }">
          {{ item.label }}
        </div>
      </n-carousel>
      <ProdList :data="indexData?.data?.courses" title="课程" />
      <ProdList :data="indexData?.data?.columns" title="专栏" type="column" />
    </div>
  </Loading>
</template>
