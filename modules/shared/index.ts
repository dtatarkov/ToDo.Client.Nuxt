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

    addImports({ from: resolver.resolve('./runtime/app/entities/observableBase'), name: 'ObservableBase' });
    addImports({ from: resolver.resolve('./runtime/app/mappers/optionalValueMapper'), name: 'OptionalValueMapper' });

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/appRuntimeConfig'), name: 'AppPublicRuntimeConfig' },
      { from: resolver.resolve('./runtime/app/interfaces/datesService'), name: 'DatesService' },
      { from: resolver.resolve('./runtime/app/interfaces/stringsService'), name: 'StringsService' },
      { from: resolver.resolve('./runtime/app/interfaces/ssrLoader'), name: 'SSRLoader' },
      { from: resolver.resolve('./runtime/app/interfaces/observable'), name: 'Observable' },
      { from: resolver.resolve('./runtime/app/interfaces/observableWritable'), name: 'ObservableWritable' },
      { from: resolver.resolve('./runtime/app/interfaces/subscribable'), name: 'Subscribable' },
      { from: resolver.resolve('./runtime/app/interfaces/destroyable'), name: 'Destroyable' },
      { from: resolver.resolve('./runtime/app/interfaces/valueMapper'), name: 'ValueMapper' },
      { from: resolver.resolve('./runtime/app/interfaces/timeMapper'), name: 'TimeMapper' },
      { from: resolver.resolve('./runtime/app/interfaces/zonedDateTimeMapper'), name: 'ZonedDateTimeMapper' },
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/serviceLocatorPlugin'));
    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
})