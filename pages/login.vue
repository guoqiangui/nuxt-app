<script setup lang="ts">
import { useUser } from '~/store/user'

const store = useUser()
const router = useRouter()
const route = useRoute()

function login() {
  store.isLogin = true
  const path = route.query.callback?.toString() || '/'
  router.push(path)
}
</script>

<template>
  <div>
    <n-button type="primary" @click="login">
      登录
    </n-button>
  </div>
</template>
