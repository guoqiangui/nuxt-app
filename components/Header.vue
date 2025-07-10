<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { useUser } from '~/store/user'

const config = useAppConfig()

const menus: MenuOption[] = [
  { label: '首页' },
  { label: '专栏' },
  { label: '课程' },
]
menus.forEach(item => (item.key = item.label as string))

const menuOptions = ref(menus)

const activeKey = ref(null)

const store = useUser()
const { userInfo } = storeToRefs(store)

const options = [
  {
    label: '用户中心',
    key: 'userCenter',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

function handleSelect(key: string) {
  if (key === 'userCenter') {
    navigateTo('/user-center')
  }
  else if (key === 'logout') {
    store.logout()
  }
}
</script>

<template>
  <div class="flex justify-between items-center bg-white p-2">
    <div class="flex items-center">
      <n-button class="text-xl mr-1" text strong>
        羊村学堂
      </n-button>
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </div>

    <div class="flex items-center">
      <div class="mr-2">
        <NuxtLink v-if="!userInfo" to="/login">
          <n-button secondary>
            登录
          </n-button>
        </NuxtLink>
        <n-dropdown v-else trigger="hover" :options="options" @select="handleSelect">
          <div class="w-12 h-12 rounded-full bg-amber-700" />
        </n-dropdown>
      </div>
      启用暗黑模式：<n-switch v-model:value="config.theme.dark" />
    </div>
  </div>
</template>
