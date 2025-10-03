<template>
  <SelectRoot v-model="selected">
    <SelectTrigger
      :class="amneziaTheme.getThemeClass('inline-flex h-8 items-center justify-around gap-2 rounded bg-gray-200 px-3 text-sm leading-none dark:bg-neutral-500 dark:text-neutral-200').value"
      aria-label="Choose option"
    >
      <SelectValue placeholder="Select..." />
      <IconsArrowDown class="size-3" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        :class="amneziaTheme.getThemeClass('z-[100] min-w-28 rounded bg-gray-300 dark:bg-neutral-500').value"
      >
        <SelectViewport class="p-2">
          <SelectItem
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :class="amneziaTheme.getThemeClass('relative flex h-6 items-center rounded px-3 text-sm leading-none outline-none hover:bg-red-800 hover:text-white dark:text-white').value"
          >
            <SelectItemText>
              {{ option.value }} - {{ option.label }}
            </SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script lang="ts" setup>
defineProps<{
  options: { label: string; value: string }[];
}>();
const selected = defineModel<string>();

const amneziaTheme = useAmneziaTheme();
</script>
