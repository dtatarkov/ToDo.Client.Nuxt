import { createResolver, addComponentsDir, addImports, addImportsDir, defineNuxtModule } from "nuxt/kit";

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

    addImportsDir(resolver.resolve('./runtime/app/entities/inputElements'));
    addImportsDir(resolver.resolve('./runtime/app/types/inputElements'));

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/inputElement'), name: 'InputElement' },
      { from: resolver.resolve('./runtime/app/interfaces/uiElement'), name: 'UIElement' },
    ])
  },
})