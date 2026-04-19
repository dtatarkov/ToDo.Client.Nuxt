import { addComponentsDir, addImports, addPlugin, defineNuxtModule } from "nuxt/kit";
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
      {
        name: 'OverlayService', from: resolver.resolve('./runtime/app/interfaces/overlayService')
      },

      {
        name: 'Modal', from: resolver.resolve('./runtime/app/interfaces/modal')
      },

      {
        name: 'ModalConfirm', from: resolver.resolve('./runtime/app/interfaces/modalConfirm')
      },
    ]);

    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
});