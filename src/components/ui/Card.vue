<template>
  <div class="card bg-white shadow-md rounded-lg p-4">
    <template v-if="$slots.title">
      <h2 class="text-xl font-semibold mb-4">
        <slot name="title" />
      </h2>
    </template>
    <template v-if="$slots.content">
      <div class="text-gray-700 mb-4">
        <slot name="content" />
      </div>
    </template>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiCard' })
</script>
