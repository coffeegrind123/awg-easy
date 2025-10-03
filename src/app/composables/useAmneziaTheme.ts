export const useAmneziaTheme = () => {
  const globalStore = useGlobalStore();
  const theme = useTheme();

  // Dynamic class generation based on AWG detection
  const getThemedClass = (wgClass: string, amneziaClass: string) => {
    return computed(() => {
      if (globalStore.isUsingAwg) {
        return amneziaClass;
      }
      return wgClass;
    });
  };

  // Logo management
  const logoPath = computed(() => {
    return globalStore.isUsingAwg ? '/logo.svg' : '/logo.png';
  });

  const faviconPath = computed(() => {
    return globalStore.isUsingAwg ? '/favicon.ico' : '/favicon.png';
  });

  const appleTouchIconPath = computed(() => {
    return globalStore.isUsingAwg ? '/apple-touch-icon.png' : '/apple-touch-icon-wg.png';
  });

  // Title management
  const appTitle = computed(() => {
    return globalStore.isUsingAwg ? 'AmneziaWG' : 'WireGuard';
  });

  // Theme-aware class getter - handles all the conditional styling
  const getThemeClass = (baseClasses: string | ComputedRef<string>) => {
    return computed(() => {
      let classes = typeof baseClasses === 'string' ? baseClasses : baseClasses.value;

      if (globalStore.isUsingAwg) {
        // Replace WireGuard theme colors with Amnezia theme colors
        classes = classes
          // Background colors (dark mode)
          .replace(/dark:bg-neutral-800\b/g, 'dark:bg-amnezia-bg-primary')
          .replace(/dark:bg-neutral-700\b/g, 'dark:bg-amnezia-bg-card')
          .replace(/dark:bg-neutral-600\b/g, 'dark:bg-amnezia-bg-elevated')
          .replace(/dark:bg-neutral-500\b/g, 'dark:bg-amnezia-bg-elevated')
          .replace(/dark:bg-neutral-400\b/g, 'dark:bg-amnezia-bg-elevated')

          // Text colors (dark mode)
          .replace(/dark:text-neutral-200\b/g, 'dark:text-amnezia-text-primary')
          .replace(/dark:text-neutral-300\b/g, 'dark:text-amnezia-text-muted')
          .replace(/dark:text-neutral-400\b/g, 'dark:text-amnezia-text-muted')

          // Border colors (dark mode)
          .replace(/dark:border-neutral-600\b/g, 'dark:border-amnezia-border')
          .replace(/dark:border-neutral-800\b/g, 'dark:border-amnezia-border')

          // Accent colors (both light and dark mode)
          .replace(/hover:bg-red-800\b/g, 'hover:bg-amnezia-accent')
          .replace(/border-red-800\b/g, 'border-amnezia-accent')
          .replace(/bg-red-800\b/g, 'bg-amnezia-accent')
          .replace(/text-red-800\b/g, 'text-amnezia-accent')
          .replace(/focus:border-red-800\b/g, 'focus:border-amnezia-accent')
          .replace(/hover:border-red-800\b/g, 'hover:border-amnezia-accent')
          .replace(/hover:bg-red-600\b/g, 'hover:bg-amnezia-accent-dark')
          .replace(/border-red-600\b/g, 'border-amnezia-accent-dark')
          .replace(/hover:border-red-600\b/g, 'hover:border-amnezia-accent-dark')
          .replace(/data-\[state=checked\]:bg-red-800\b/g, 'data-[state=checked]:bg-amnezia-accent')
          .replace(/focus-within:outline-red-700\b/g, 'focus-within:outline-amnezia-accent')

          // Special cases for dark mode
          .replace(/dark:hover:bg-red-800\b/g, 'dark:hover:bg-amnezia-accent')
          .replace(/dark:bg-red-800\b/g, 'dark:bg-amnezia-accent')
          .replace(/dark:hover:bg-red-600\b/g, 'dark:hover:bg-amnezia-accent-dark')
          .replace(/dark:bg-red-600\b/g, 'dark:bg-amnezia-accent-dark');
      }

      return classes;
    });
  };

  return {
    getThemedClass,
    getThemeClass,
    logoPath,
    faviconPath,
    appleTouchIconPath,
    appTitle,
    isUsingAwg: computed(() => globalStore.isUsingAwg),
  };
};