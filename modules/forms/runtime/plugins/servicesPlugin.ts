import { FormElementFactory } from "../app/interfaces/internal/formElementFactory";
import { FormFactory } from "../app/interfaces/formFactory";
import { FormElementFactoryImpl } from "../app/factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../app/factories/formFactoryImpl";

export default defineNuxtPlugin(() =>
{
  registerServiceFactory(FormElementFactory, () =>
  {
    const uiKitElementsFactory = getService(UIKitElementsFactory);
    const result = new FormElementFactoryImpl(uiKitElementsFactory);

    return result;
  }, ServiceScope.Singleton);

  registerServiceFactory(FormFactory, () =>
  {
    const formElementFactory = getService(FormElementFactory);
    const formFactory = new FormFactoryImpl(formElementFactory);

    return formFactory;
  }, ServiceScope.Singleton);
});