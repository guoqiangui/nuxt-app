<template>
  <div class="py-5">
    <n-grid class="mb-5" x-gap="12" cols="1 s:2 m:4" responsive="screen">
      <n-gi v-for="item in 8" :key="item" class="mb-5">
        <n-card>
          <template #cover>
            <n-skeleton height="200px" />
          </template>
          <n-skeleton text :repeat="2" />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
