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
    return globalStore.isUsingAwg ? '/logo-amnezia.svg' : '/logo.svg';
  });

  const faviconPath = computed(() => {
    return globalStore.isUsingAwg ? '/favicon-amnezia.ico' : '/favicon.png';
  });

  const appleTouchIconPath = computed(() => {
    return globalStore.isUsingAwg ? '/apple-touch-icon-amnezia.png' : '/apple-touch-icon.png';
  });

  // Title management
  const appTitle = computed(() => {
    return globalStore.isUsingAwg ? 'AmneziaWG' : 'WireGuard';
  });

  // Theme-aware class getter - handles all the conditional styling
  const getThemeClass = (baseClasses: string | ComputedRef<string>) => {
    return computed(() => {
      let classes = typeof baseClasses === 'string' ? baseClasses : baseClasses.value;

      if (globalStore.isUsingAwg && theme.value === 'dark') {
        // Replace WireGuard dark theme colors with Amnezia dark theme colors
        classes = classes
          // Background colors
          .replace(/dark:bg-neutral-800\b/g, 'dark:bg-amnezia-bg-primary')
          .replace(/dark:bg-neutral-700\b/g, 'dark:bg-amnezia-bg-elevated')
          .replace(/dark:bg-neutral-600\b/g, 'dark:bg-amnezia-border')
          .replace(/dark:bg-neutral-500\b/g, 'dark:bg-amnezia-bg-elevated')

          // Text colors
          .replace(/dark:text-neutral-200\b/g, 'dark:text-amnezia-text-primary')
          .replace(/dark:text-neutral-300\b/g, 'dark:text-amnezia-text-muted')
          .replace(/dark:text-neutral-400\b/g, 'dark:text-amnezia-text-muted')

          // Border colors
          .replace(/dark:border-neutral-600\b/g, 'dark:border-amnezia-border')
          .replace(/dark:border-neutral-800\b/g, 'dark:border-amnezia-border')

          // Accent colors
          .replace(/hover:bg-red-800\b/g, 'hover:bg-amnezia-accent')
          .replace(/border-red-800\b/g, 'border-amnezia-accent')
          .replace(/bg-red-800\b/g, 'bg-amnezia-accent')
          .replace(/text-red-800\b/g, 'text-amnezia-accent')
          .replace(/focus:border-red-800\b/g, 'focus:border-amnezia-accent')
          .replace(/hover:border-red-800\b/g, 'hover:border-amnezia-accent')
          .replace(/hover:bg-red-600\b/g, 'hover:bg-amnezia-accent-dark')
          .replace(/border-red-600\b/g, 'border-amnezia-accent-dark')

          // Special cases
          .replace(/dark:hover:bg-red-800\b/g, 'dark:hover:bg-amnezia-accent')
          .replace(/dark:bg-red-800\b/g, 'dark:bg-amnezia-accent')
          .replace(/dark:hover:bg-red-600\b/g, 'dark:hover:bg-amnezia-accent-dark');
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