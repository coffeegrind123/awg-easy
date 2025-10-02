export default defineNuxtPlugin(() => {
  const globalStore = useGlobalStore();
  const theme = useTheme();

  // Function to inject Amnezia theme styles
  const injectAmneziaStyles = () => {
    let styleId = 'amnezia-theme-override';
    let existingStyle = document.getElementById(styleId);

    if (existingStyle) {
      existingStyle.remove();
    }

    if (globalStore.isUsingAwg && theme.value === 'dark') {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Amnezia theme overrides when AWG is detected and dark mode is active */
        .dark .awg-dark\:bg-amnezia-bg-primary { background-color: #16171D !important; }
        .dark .awg-dark\:bg-amnezia-bg-elevated { background-color: #2C2D30 !important; }
        .dark .awg-dark\:bg-amnezia-bg-card { background-color: #242526 !important; }
        .dark .awg-dark\:text-amnezia-text-primary { color: #E3E3E3 !important; }
        .dark .awg-dark\:text-amnezia-text-secondary { color: #F5F6F7 !important; }
        .dark .awg-dark\:text-amnezia-text-muted { color: #B7C0C7 !important; }
        .dark .awg-dark\:border-amnezia-border { border-color: #292A2E !important; }
        .dark .awg-hover\:bg-amnezia-accent:hover { background-color: #FBB26A !important; }
        .dark .awg-bg-amnezia-accent { background-color: #FBB26A !important; }
        .dark .awg-hover\:bg-amnezia-accent-dark:hover { background-color: #A85809 !important; }
      `;
      document.head.appendChild(style);
    }
  };

  // Watch for changes in AWG status and theme
  watch([() => globalStore.isUsingAwg, () => theme.value], () => {
    injectAmneziaStyles();
  }, { immediate: true });
});