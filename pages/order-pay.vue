<script setup lang="ts">
import { OrderStatus } from '~/server/database/generated/prisma/enums'
import type { OrderWithCourseResponse } from '~/types/api'

const { $api } = useNuxtApp()
const route = useRoute()
const { id } = route.query

const order = ref()
const qrcodeContent = ref('some random content')

onMounted(async () => {
  const orderRes = await $api<ApiResponse<OrderWithCourseResponse>>(`/api/order/${id}`)
  order.value = orderRes.data
})

async function handlePay() {
  const res = await $api<ApiResponse<OrderWithCourseResponse>>(`/api/order`, {
    method: 'PATCH',
    body: {
      id: order.value?.id,
      status: OrderStatus.COMPLETED
    },
  })

  if (res.ok) {
    navigateTo(`/course/detail/${order.value?.course.id}`)
  }
}
</script>

<template>
  <div v-if="order" class="flex flex-col justify-center items-center gap-8 bg-white p-8 rounded-lg mt-6">
    <h2 class="text-2xl font-bold">
      确认支付
    </h2>
    <div class="text-sm text-gray-500">
      距离过期还有
    </div>
    <div class="text-xl font-bold">
      总额
      <n-el tag="span" style="color: var(--primary-color)" class="text-2xl font-bold mr-2">
        🌱{{ order.course.price }}
      </n-el>
    </div>
    <n-qr-code :value="qrcodeContent" padding="0" :size="200" />
    <n-button type="primary" @click="handlePay">
      已支付
    </n-button>
  </div>
</template>
