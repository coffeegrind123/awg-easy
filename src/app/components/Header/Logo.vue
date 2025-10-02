<template>
  <NuxtLink to="/" class="mb-4">
    <h1 :class="amneziaTheme.getThemeClass('text-4xl font-medium dark:text-neutral-200')">
      <img
        :src="amneziaTheme.logoPath.value"
        width="32"
        class="dark:bg mr-2 inline align-middle"
      /><span class="align-middle">{{ amneziaTheme.appTitle.value }}</span>
    </h1>
  </NuxtLink>
</template>

<script setup lang="ts">
const amneziaTheme = useAmneziaTheme();
</script>
