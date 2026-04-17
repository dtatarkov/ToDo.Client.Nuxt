import { addComponentsDir, addImports, addImportsDir, addPlugin, defineNuxtModule } from "nuxt/kit";
import { createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: 'todo',
  },

  setup()
  {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve('./runtime/app/widgets')
    });

    addPlugin(resolver.resolve('./runtime/plugins/servicesPlugin'), { append: true });
  },
})