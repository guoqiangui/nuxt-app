<script setup lang="ts">
const config = useAppConfig()

useHead(() => ({
  htmlAttrs: { class: config.theme.dark ? 'dark' : '' },
  titleTemplate(title) {
    return title ? `${title} - 小博客` : '小博客'
  },
}))
</script>

<template>
  <NuxtLayout>
    <n-message-provider>
      <NuxtPage />
    </n-message-provider>
  </NuxtLayout>
</template>
