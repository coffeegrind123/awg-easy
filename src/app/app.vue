<template>
  <ToastProvider>
    <NuxtLayout>
      <NuxtPage />
      <ToastViewport
        class="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      >
        <BaseToast ref="toastRef" />
      </ToastViewport>
    </NuxtLayout>
  </ToastProvider>
</template>

<script setup lang="ts">
const toast = useToast();
const toastRef = useTemplateRef('toastRef');
toast.setToast(toastRef);

// make sure to fetch release early
useGlobalStore();

const amneziaTheme = useAmneziaTheme();

useHead({
  bodyAttrs: {
    class: amneziaTheme.getThemeClass('bg-gray-50 dark:bg-neutral-800'),
  },
  link: [
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: amneziaTheme.faviconPath,
    },
    {
      rel: 'apple-touch-icon',
      href: amneziaTheme.appleTouchIconPath,
    },
  ],
  meta: [
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  title: amneziaTheme.appTitle,
});
</script>
