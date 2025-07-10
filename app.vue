<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'

const config = useAppConfig()

useHead(() => ({
  htmlAttrs: { class: config.theme.dark ? 'dark' : '' },
  titleTemplate(title) {
    return title ? `${title} - 小博客` : '小博客'
  },
}))
</script>

<template>
  <n-message-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-message-provider>
</template>
