export default defineI18nLocale(() =>
  import('@client/infrastructure-i18n/locales/ru.json')
    .then(module => module.default));