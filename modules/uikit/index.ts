import { createResolver, addComponentsDir, addImports, addImportsDir, defineNuxtModule, addPlugin } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'uikit',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/components')
    });

    addImportsDir([
      resolver.resolve('./runtime/app/types'),
      resolver.resolve('./runtime/app/types/inputElements'),
    ]);

    addImports([
      {
        name: 'UIElement', from: resolver.resolve('./runtime/app/interfaces/uiElement')
      },

      {
        name: 'InputElement', from: resolver.resolve('./runtime/app/interfaces/inputElement')
      },

      {
        name: 'ButtonElement', from: resolver.resolve('./runtime/app/interfaces/buttonElement')
      },

      {
        name: 'UIKitElementsFactory', from: resolver.resolve('./runtime/app/interfaces/uiKitElementsFactory')
      }
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
});