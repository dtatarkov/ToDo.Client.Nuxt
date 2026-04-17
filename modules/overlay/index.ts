import { addComponentsDir, addImports, addImportsDir, addPlugin, defineNuxtModule } from "@nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'overlay',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/widgets')
    });

    addImports([
      { from: resolver.resolve('./runtime/app/interfaces/modal'), name: 'Modal' },
      { from: resolver.resolve('./runtime/app/interfaces/overlayService'), name: 'OverlayService' },
      { from: resolver.resolve('./runtime/app/interfaces/overlayElement'), name: 'OverlayElement' },
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
})