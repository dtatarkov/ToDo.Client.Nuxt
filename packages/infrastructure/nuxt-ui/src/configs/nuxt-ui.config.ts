const nuxtUIConfig = {
  colorMode: false,

  colors: {
    primary: 'blue' as const,
    neutral: 'zinc' as const,
  },

  components: {
    include: [
      'UApp',
      'UModal',
      'UToast',
      'UForm',
      'UFormField',
      'UCard',
      'UButton',
      'UInput',
      'UTextarea',
      'UInputDate',
      'UInputTime',
      'UHeader',
      'UMain',
      'UFooter',
      'USidebar',
      'UNavigationMenu',
      'UCollapsible',
      'UBadge',
    ]
  },

  // Disable safelist colors to reduce CSS size
  safelistColors: false
};

export default nuxtUIConfig; 