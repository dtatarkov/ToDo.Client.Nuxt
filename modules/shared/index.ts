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

    addPlugin(resolver.resolve('./runtime/plugins/serviceLocatorPlugin'));
    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
})