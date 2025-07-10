<script setup lang="ts">
import type { FormInst } from 'naive-ui'

useHead({ title: '登录' })

definePageMeta({
  layout: 'blank',
})

const message = useMessage()

interface Model {
  username: string
  password: string
}

const model = ref<Partial<Model>>({})
const rules = {
  username: { required: true, message: '请输入' },
  password: { required: true, message: '请输入' },
}
const formRef = ref<FormInst | null>(null)

const { handleAuthResponse } = useAuthHandler()

async function handleLogin() {
  try {
    await formRef.value?.validate()
  }
  catch {
    message.warning('表单校验未通过')
    return
  }

  const res = await $fetch<{ ok: boolean, data: unknown }>('/api/login', { method: 'post', body: model.value })
  handleAuthResponse(res, '登录成功')
}
</script>

<template>
  <div class="w-96">
    <h2 class="flex justify-between items-center mb-6">
      <NuxtLink to="/" class="text-black text-xl">
        返回羊村
      </NuxtLink>
      <NuxtLink to="/register" class="text-sm">
        <n-el class="text-[--primary-color]">
          还未入村？
        </n-el>
      </NuxtLink>
    </h2>

    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
      <n-form-item path="username" label="用户名">
        <n-input v-model:value="model.username" placeholder="请输入" clearable @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input v-model:value="model.password" placeholder="请输入" clearable @keydown.enter.prevent />
      </n-form-item>
    </n-form>

    <n-button type="primary" block @click="handleLogin">
      登录
    </n-button>
  </div>
</template>
