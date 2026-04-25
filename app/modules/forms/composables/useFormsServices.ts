import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import { FormFactory } from "../interfaces/formFactory";
import { FormElementFactoryImpl } from "../factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../factories/formFactoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useFormsServices(): void
{
    useServiceRegistration(FormElementFactory).to(FormElementFactoryImpl).asTransient();
    useServiceRegistration(FormFactory).to(FormFactoryImpl).asTransient();
}