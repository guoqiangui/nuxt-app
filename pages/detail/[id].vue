<script setup lang="ts">
import { useUser } from '~/store/user'

const route = useRoute()
const store = useUser()
const router = useRouter()

const { data, error, pending } = useFetch(`/api/post/${route.params.id}`, {
  headers: { token: store.userInfo ? '123' : '' },
  onResponseError: ({ response }) => {
    if (response.status === 401) {
      router.push(`/login?callback=${route.fullPath}`)
    }
  },
})

const value = ref('')

const message = useMessage()

function send() {
  if (!value.value) {
    message.warning('留言不能为空')
    return
  }

  value.value = ''
  message.success('提交成功')
}

useHead(() => ({
  title: data.value?.data?.title,
}))
</script>

<template>
  <div>
    <div v-if="pending">
      加载中...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else class="p-5">
      <h1 class="text-2xl">
        {{ data?.data?.title }}
      </h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="data?.data?.content" />
      <n-input v-model:value="value" type="textarea" placeholder="留言" />
      <div>
        <n-button type="primary" @click="send">
          发送
        </n-button>
      </div>
    </div>
  </div>
</template>
