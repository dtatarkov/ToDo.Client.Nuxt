import { addImports, addImportsDir, addPlugin, defineNuxtModule } from "nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'shared',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve('./runtime/app/enums'));
    addImportsDir(resolver.resolve('./runtime/app/types'));
    addImportsDir(resolver.resolve('./runtime/app/composables'));
    addImportsDir(resolver.resolve('./runtime/app/utils'));
    addImportsDir(resolver.resolve('./runtime/app/entities'));
    addImportsDir(resolver.resolve('./runtime/app/mappers'));

    addImports([
      { name: 'AppPublicRuntimeConfig', from: resolver.resolve('./runtime/app/interfaces/appPublicRuntimeConfig') },
      { name: 'DataAdapterFactory', from: resolver.resolve('./runtime/app/interfaces/dataAdapterFactory') },
      { name: 'DatesService', from: resolver.resolve('./runtime/app/interfaces/datesService') },
      { name: 'Destroyable', from: resolver.resolve('./runtime/app/interfaces/destroyable') },
      { name: 'EventBus', from: resolver.resolve('./runtime/app/interfaces/eventBus') },
      { name: 'Observable', from: resolver.resolve('./runtime/app/interfaces/observable') },
      { name: 'ObservableWritable', from: resolver.resolve('./runtime/app/interfaces/observableWritable') },
      { name: 'SSRLoader', from: resolver.resolve('./runtime/app/interfaces/ssrLoader') },
      { name: 'StringsService', from: resolver.resolve('./runtime/app/interfaces/stringsService') },
      { name: 'Subscribable', from: resolver.resolve('./runtime/app/interfaces/subscribable') },
      { name: 'TimeMapper', from: resolver.resolve('./runtime/app/interfaces/timeMapper') },
      { name: 'ValueMapper', from: resolver.resolve('./runtime/app/interfaces/valueMapper') },
      { name: 'VueComponentPropsFactory', from: resolver.resolve('./runtime/app/interfaces/vueComponentPropsFactory') },
      { name: 'ZonedDateTimeMapper', from: resolver.resolve('./runtime/app/interfaces/zonedDateTimeMapper') },
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/serviceLocatorPlugin'));
    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
});