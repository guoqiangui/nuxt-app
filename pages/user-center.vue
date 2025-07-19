<script setup lang="ts">
const menuOptions = [
  {
    label: '已购课程',
    key: 'buy',
  },
  {
    label: '修改资料',
    key: 'info',
  },
  {
    label: '修改密码',
    key: 'password',
  },
]

definePageMeta({
  middleware: (to) => {
    if (to.path === '/user-center') {
      return navigateTo(`/user-center/${menuOptions[0].key}`)
    }
  },
})

function handleUpdate(key: string) {
  navigateTo(`/user-center/${key}`)
}
</script>

<template>
  <div class="py-4">
    <n-grid x-gap="12">
      <n-grid-item :span="5">
        <n-menu
          class="bg-white"
          :options="menuOptions"
          :on-update:value="handleUpdate"
        />
      </n-grid-item>
      <n-grid-item :span="19">
        <NuxtPage />
      </n-grid-item>
    </n-grid>
  </div>
</template>
