<template>
  <h1
    :class="amneziaTheme.getThemeClass('my-16 text-center text-4xl font-medium text-gray-700 dark:text-neutral-200')"
  >
    <img :src="amneziaTheme.logoPath.value" width="32" class="dark:bg inline align-middle" />
    <span :class="amneziaTheme.getThemeClass('align-middle dark:text-neutral-200').value">{{ amneziaTheme.appTitle.value }}</span>
  </h1>
</template>

<script setup lang="ts">
const amneziaTheme = useAmneziaTheme();
</script>
