<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import type { ApiResponse } from '~/types/api'

const formRef = useTemplateRef('formRef')
const message = useMessage()

const model = ref({
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
})

const rules: FormRules = {
  oldPwd: { required: true, message: '请输入旧密码' },
  newPwd: { required: true, message: '请输入新密码' },
  confirmPwd: [
    {
      validator: (rule, value) => {
        if (!value)
          return new Error('请输入确认密码')

        if (value !== model.value.newPwd)
          return new Error('两次密码输入不一致')

        return true
      },
    },
  ],
}

async function handleSubmit() {
  await formRef.value?.validate()

  const { $api } = useNuxtApp()
  const res = await $api<ApiResponse<boolean>>('/api/change-pwd', {
    method: 'POST',
    body: {
      oldPwd: model.value.oldPwd,
      newPwd: model.value.newPwd,
    },
  })

  if (res.ok) {
    message.success('密码修改成功')
  }
}
</script>

<template>
  <div class="bg-white p-4">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
      <n-form-item path="oldPwd" label="旧密码">
        <n-input v-model:value="model.oldPwd" placeholder="请输入" />
      </n-form-item>
      <n-form-item path="newPwd" label="新密码">
        <n-input v-model:value="model.newPwd" placeholder="请输入" />
      </n-form-item>
      <n-form-item path="confirmPwd" label="确认密码">
        <n-input v-model:value="model.confirmPwd" placeholder="请输入" />
      </n-form-item>
    </n-form>
    <n-button type="primary" @click="handleSubmit">
      提交修改
    </n-button>
  </div>
</template>
