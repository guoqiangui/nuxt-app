<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'

useHead({ title: '注册' })

definePageMeta({
  layout: 'blank',
})

const message = useMessage()

interface Model {
  username: string
  password: string
  repeatPassword: string
}

const model = ref<Partial<Model>>({})
const rules: FormRules = {
  username: { required: true, message: '请输入' },
  password: { required: true, message: '请输入' },
  repeatPassword: [{ required: true, message: '请输入' }, { validator: (rule, value) => {
    if (value !== model.value.password) {
      return new Error('两次密码不一致')
    }
    return true
  } }],
}
const formRef = ref<FormInst | null>(null)

const { handleAuthResponse } = useAuthHandler()

async function handleRegister() {
  try {
    await formRef.value?.validate()
  }
  catch {
    message.warning('表单校验未通过')
    return
  }

  const { $api } = useNuxtApp()
  const res = await $api<{ ok: boolean, data: unknown }>('/api/register', { method: 'post', body: model.value })
  handleAuthResponse(res, '注册成功')
}
</script>

<template>
  <div class="w-96">
    <h2 class="flex justify-between items-center mb-6">
      <span class="text-black text-xl">
        加入羊群
      </span>
      <NuxtLink to="/login" class="text-sm">
        <n-el class="text-[--primary-color]">
          返回登录
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
      <n-form-item path="repeatPassword" label="确认密码">
        <n-input v-model:value="model.repeatPassword" placeholder="请输入" clearable @keydown.enter.prevent />
      </n-form-item>
    </n-form>

    <n-button type="primary" block @click="handleRegister">
      注册
    </n-button>
    <div class="text-center text-xs mt-5 text-gray-600">
      注册即同意
      <n-button text type="primary" size="tiny">
        《服务协议》
      </n-button>
      和
      <n-button text type="primary" size="tiny">
        《隐私政策》
      </n-button>
    </div>
  </div>
</template>
