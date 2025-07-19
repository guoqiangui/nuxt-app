<script setup lang="ts">
import type { User } from '~/server/database/generated/prisma/client'
import type { ApiResponse } from '~/types/api'

const message = useMessage()

const formRef = useTemplateRef('formRef')

const model = ref<{
  nickname: string
  sex: string
}>({
  nickname: '',
  sex: '',
})

const rules = {
  nickname: {
    required: true,
    message: '请输入昵称',
  },
  sex: {
    required: true,
    message: '请选择性别',
  },
}

async function handleSubmit() {
  await formRef.value?.validate()

  const { $api } = useNuxtApp()
  const res = await $api<ApiResponse<User>>('/api/user-info', {
    method: 'POST',
    body: model.value,
  })

  if (res.ok) {
    message.success('修改成功')
  }
}
</script>

<template>
  <div class="bg-white p-4">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
      <n-form-item path="nickname" label="昵称">
        <n-input v-model:value="model.nickname" placeholder="请输入" />
      </n-form-item>
      <n-form-item path="sex" label="性别">
        <n-radio-group v-model:value="model.sex">
          <n-radio value="male">
            男
          </n-radio>
          <n-radio value="female">
            女
          </n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <n-button type="primary" @click="handleSubmit">
      提交修改
    </n-button>
  </div>
</template>
