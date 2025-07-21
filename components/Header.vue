<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { User } from '~/server/database/generated/prisma/client'
import type { ApiResponse } from '~/types/api'
import { DarkModeFilled, LightModeFilled, MenuFilled } from '@vicons/material'
import { useUser } from '~/store/user'

const config = useAppConfig()

const menus: MenuOption[] = [
  { label: '首页', url: '/' },
  { label: '专栏', url: '/list/column' },
  { label: '课程', url: '/list/course' },
]
menus.forEach(item => (item.key = item.label as string))

const menuOptions = ref(menus)

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

const showMobileMenu = ref(false)

function handleMobileMenuSelect(key: string, item: MenuOption) {
  navigateTo(item.url as string)
  showMobileMenu.value = false
}

onMounted(async () => {
  if (getToken()) {
    const { $api } = useNuxtApp()
    const res = await $api<ApiResponse<User>>('/api/user-info')
    if (res.ok) {
      store.userInfo = res.data
    }
  }
})
</script>

<template>
  <div class="flex justify-between items-center bg-white p-2">
    <div class="flex items-center">
      <n-button class="text-xl mr-1" text strong>
        羊村学堂
      </n-button>
      <div class="hidden md:block">
        <n-menu
          mode="horizontal"
          :options="menuOptions"
          :on-update:value="(key, item) => navigateTo(item.url as string)"
        />
      </div>
      <n-button class="md:hidden" @click="showMobileMenu = true">
        <n-icon :component="MenuFilled" size="18" />
      </n-button>
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
      <n-switch v-model:value="config.theme.dark">
        <template #checked-icon>
          <n-icon :component="DarkModeFilled" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="LightModeFilled" />
        </template>
      </n-switch>
    </div>
  </div>
  <n-drawer v-model:show="showMobileMenu" placement="left">
    <n-menu
      mode="vertical"
      :options="menuOptions"
      :on-update:value="handleMobileMenuSelect"
    />
  </n-drawer>
</template>
