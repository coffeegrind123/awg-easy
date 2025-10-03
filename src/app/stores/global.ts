export const useGlobalStore = defineStore('Global', () => {
  const { data: information } = useFetch('/api/information', {
    method: 'get',
  });

  // Cache AWG status in cookie for persistence across pages
  const awgStatusCache = useCookie<boolean>('awg-status-cache', {
    default: () => false,
    maxAge: 60 * 60 * 24, // Cache for 24 hours
  });

  // Fetch AWG status from the interface endpoint
  const { data: interfaceData } = useFetch('/api/admin/interface', {
    method: 'get',
    server: false, // Don't fetch on server-side to avoid SSR issues
    default: () => ({ isUsingAwg: false }), // Provide default value
    onResponse({ response }) {
      // Cache the AWG status when we get a response
      if (response._data?.isUsingAwg !== undefined) {
        awgStatusCache.value = response._data.isUsingAwg;
      }
    },
  });

  // Proactive AWG detection function
  const detectAwgStatus = async () => {
    try {
      // Try to fetch from interface endpoint
      const response = await $fetch('/api/admin/interface');
      if (response?.isUsingAwg !== undefined) {
        awgStatusCache.value = response.isUsingAwg;
        return response.isUsingAwg;
      }
    } catch (error) {
      // If interface endpoint fails, keep cached value
      console.debug('AWG detection: interface endpoint not available, using cached value');
    }
    return awgStatusCache.value;
  };

  const isUsingAwg = computed(() => {
    // Use interface data if available, otherwise fall back to cache
    return interfaceData.value?.isUsingAwg ?? awgStatusCache.value;
  });

  // Detect AWG status early on store initialization
  if (import.meta.client) {
    detectAwgStatus();
  }

  const sortClient = ref(true); // Sort clients by name, true = asc, false = desc

  const uiShowCharts = useCookie<boolean>('uiShowCharts', {
    default: () => false,
    maxAge: 365 * 24 * 60 * 60,
  });

  function toggleCharts() {
    uiShowCharts.value = !uiShowCharts.value;
  }

  const uiChartType = useCookie<'area' | 'bar' | 'line'>('uiChartType', {
    default: () => 'area',
    maxAge: 365 * 24 * 60 * 60,
  });

  return {
    sortClient,
    information,
    interfaceData,
    isUsingAwg,
    detectAwgStatus,
    uiShowCharts,
    toggleCharts,
    uiChartType,
  };
});
