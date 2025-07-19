<script setup lang="ts">
import type { Order } from '~/server/database/generated/prisma/client'
import type { ApiResponse, ColumnResponse, CourseWithCatalogueResponse } from '~/types/api'

definePageMeta({
  validate(route) {
    return ['course', 'column'].includes(route.params.type as string)
  },
})

const route = useRoute()

const { data } = await useFetch<ApiResponse<{
  item: CourseWithCatalogueResponse | ColumnResponse
  recommend: CourseWithCatalogueResponse[] | ColumnResponse[]
}>>(`/api/${route.params.type}/${route.params.id}`)

const itemData = computed(() => data.value?.data.item)
const recommend = computed(() => data.value?.data.recommend)

const isCourse = computed(() => route.params.type === 'course')
const course = computed(() => isCourse.value ? itemData.value as CourseWithCatalogueResponse : undefined)

const type = computed(() => route.params.type as 'course' | 'column')

async function handleBuy() {
  const { $api } = useNuxtApp()

  const data = await $api<ApiResponse<Order>>('/api/order', {
    method: 'POST',
    body: { courseId: itemData.value?.id },
  })

  navigateTo(`/order-detail/${data.data.id}`)
}
</script>

<template>
  <div v-if="data">
    <div class="bg-white rounded p-4 mt-4 flex gap-4">
      <img class="w-100 h-60 rounded object-cover" :src="itemData?.cover" alt="">
      <div class="flex flex-col justify-between items-start">
        <div>
          <h2 class="text-2xl font-bold">
            {{ itemData?.title }}
          </h2>
          <p class="text-sm text-gray-500 py-2">
            {{ itemData?.desc }}
          </p>
          <div v-if="isCourse">
            <n-el
              tag="span"
              style="color: var(--primary-color);"
              class="text-xl mr-2"
            >
              🌱{{ course?.price }}
            </n-el>
            <span class="text-sm text-gray-500 line-through">🌱{{ course?.oPrice }}</span>
          </div>
        </div>
        <n-button v-if="isCourse" type="primary" @click="handleBuy">
          快到碗里来
        </n-button>
      </div>
    </div>

    <n-grid class="mt-4" x-gap="12">
      <n-gi :span="18" class="bg-white rounded p-4">
        <n-tabs type="line" animated>
          <n-tab-pane name="oasis" tab="详情">
            {{ itemData?.desc }}
          </n-tab-pane>
          <n-tab-pane v-if="isCourse" name="the beatles" tab="目录">
            <n-list>
              <n-list-item v-for="(item, index) in course?.Catalogue" :key="item.id">
                <n-tag type="info" size="small">
                  第{{ index + 1 }}节
                </n-tag>
                {{ item.title }}
              </n-list-item>
            </n-list>
          </n-tab-pane>
        </n-tabs>
      </n-gi>
      <n-gi :span="6" class="bg-white rounded p-4">
        <h2 class="text-lg font-bold pb-2">
          精品推荐
        </h2>
        <Prod v-for="item in recommend" :key="item.id" :data="item" :type="type" />
      </n-gi>
    </n-grid>
  </div>
</template>
