<template>
  <div>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="p-5">
      <h1 class="text-2xl">{{ data?.title }}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="data?.content" />
      <n-input v-model:value="value" type="textarea" placeholder="留言" />
      <div>
        <n-button type="primary" @click="send"> 发送 </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~/store/user";

const route = useRoute();

const { data, error, pending } = useFetch(`/api/post/${route.params.id}`);

const value = ref("");

const message = useMessage();

const store = useUser();

const router = useRouter();

function send() {
  if (!store.isLogin) {
    //未登录
    router.push(`/login?callback=${route.fullPath}`);
    return;
  }

  if (!value.value) {
    message.warning("留言不能为空");
    return;
  }

  value.value = "";
  message.success("提交成功");
}

watchEffect(() => {
  if (error.value) {
    showError(error.value);
  }
});
</script>
