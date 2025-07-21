<script setup lang="ts">
const route = useRoute()
const type = (route.params.type as 'course' | 'column') || 'course'

const page = ref(1)
const size = ref(10)
const total = ref(0)

const { data, pending } = useFetch(() => `/api/${type}?page=${page.value}&size=${size.value}`)

watch(data, (newVal) => {
  if (newVal?.data?.total) {
    total.value = newVal.data.total
  }
})
</script>

<template>
  <Loading :pending="pending">
    <template #loading>
      <LoadingCourseSkeleton />
    </template>

    <div class="py-5">
      <n-grid v-if="data?.data?.list" class="mb-5" x-gap="12" cols="1 s:2 m:4" responsive="screen">
        <n-gi v-for="item in data.data.list" :key="item.id">
          <Prod :type="type" :data="item" />
        </n-gi>
      </n-grid>

      <div class="flex justify-center">
        <n-pagination v-model:page="page" :item-count="total" />
      </div>
    </div>
  </Loading>
</template>
