<script setup lang="ts">
import type { OrderWithCourseResponse } from '~/types/api'
import { OrderStatus } from '~/server/database/generated/prisma/enums'

const { $api } = useNuxtApp()
const route = useRoute()
const id = route.params.id

const order = ref<OrderWithCourseResponse>()

onMounted(async () => {
  const res = await $api<ApiResponse<OrderWithCourseResponse>>(`/api/order/${id}`)
  order.value = res.data
})

async function handleConfirmOrder() {
  const data = await $api('/api/order', {
    method: 'PATCH',
    body: {
      id: order.value?.id,
      status: OrderStatus.WAIT_PAY,
    },
  })

  if (data.ok) {
    navigateTo(`/order-pay?id=${order.value?.id}`)
  }
}
</script>

<template>
  <div v-if="order" class="bg-white mt-4 p-4 rounded-lg">
    <h2 class="text-xl mb-4 text-gray-500">
      产品信息
    </h2>
    <div class="flex gap-4 mb-4">
      <img class="w-100 h-60 object-cover" :src="order.course.cover" alt="">
      <div>
        <h3 class="text-2xl font-bold mb-4">
          {{ order.course.title }}
        </h3>
        <p class="text-sm text-gray-500">
          {{ order.course.desc }}
        </p>
      </div>
    </div>
    <div class="text-sm text-red">
      请在30分钟内完成支付
    </div>
    <div class="flex justify-end items-center">
      总计
      <n-el tag="span" style="color: var(--primary-color)" class="text-2xl font-bold mr-2">
        🌱{{ order.course.price }}
      </n-el>
      <n-button type="primary" @click="handleConfirmOrder">
        确认订单
      </n-button>
    </div>
  </div>
</template>
