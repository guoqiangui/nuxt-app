<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'

const config = useAppConfig()

useHead(() => ({
  htmlAttrs: { class: config.theme.dark ? 'dark' : '' },
  titleTemplate(title) {
    return title ? `${title} - 羊村学堂` : '羊村学堂'
  },
}))
</script>

<template>
  <n-message-provider>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-message-provider>
</template>
