declare module 'nuxt/schema' {
  interface PublicRuntimeConfig  {
    apiBaseUrl: string;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}