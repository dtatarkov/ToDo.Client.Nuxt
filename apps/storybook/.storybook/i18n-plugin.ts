import { setup } from '@storybook/vue3-vite';
import { createI18n } from 'vue-i18n';
import ru from '@client/infrastructure-i18n/locales/ru.json';

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
        ru
    },
});

setup((app) =>
{
    app.use(i18n);
});