<script setup lang="ts">
useHead({
  title: '文章列表',
})

const page = ref(1)

function prev() {
  page.value--
}

function next() {
  page.value++
}

const {
  data: posts,
  pending,
  error,
} = useFetch(() => `/api/posts?page=${page.value}&size=2`)
</script>

<template>
  <div class="dark:bg-slate-400">
    index page
    <NuxtLink to="/detail/1" class="text-blue-500">
      Detail
    </NuxtLink>
    <n-button type="primary">
      Primary
    </n-button>

    <div v-if="pending">
      加载中...
    </div>
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <div v-else class="text-center">
      <div v-for="item in posts" :key="item.id" class="mb-2.5">
        <NuxtLink class="text-blue-500 text-2xl" :to="`/detail/${item.id}`">
          {{ item.title }}
        </NuxtLink>
        <p>{{ item.date }}</p>
      </div>
    </div>

    <n-button size="small" @click="prev">
      上一页
    </n-button>
    <n-button size="small" @click="next">
      下一页
    </n-button>
  </div>
</template>
