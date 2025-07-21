<script setup lang="ts">
const { pending = false } = defineProps<{ pending?: boolean }>()
</script>

<template>
  <div>
    <template v-if="pending">
      <slot name="loading">
        <NCard v-for="i in 4" :key="i" class="mb-5">
          <NSkeleton text style="width: 30%" />
          <NSkeleton text :repeat="2" />
          <NSkeleton text style="width: 45%" />
          <NSkeleton text style="width: 60%" />
        </NCard>
      </slot>
    </template>
    <slot v-else />
  </div>
</template>
