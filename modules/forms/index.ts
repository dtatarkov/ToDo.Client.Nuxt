import { addComponentsDir, addImports, addImportsDir, addPlugin, defineNuxtModule } from "nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'forms',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/components')
    });

    addImportsDir(resolver.resolve('./runtime/app/enums'));
    addImportsDir(resolver.resolve('./runtime/app/composables'));
    addImportsDir(resolver.resolve('./runtime/app/types'));

    addImports([
      {
        name: 'FormFactory', from: resolver.resolve('./runtime/app/interfaces/formFactory') 
      },

      {
        name: 'Form', from: resolver.resolve('./runtime/app/interfaces/form') 
      },
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
})