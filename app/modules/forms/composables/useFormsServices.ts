import { FormElementFactoryImpl } from '../factories/formElementFactoryImpl';
import { FormFactoryImpl } from '../factories/formFactoryImpl';
import { InputElementsFactory } from '../factories/inputElementsFactory';
import { InputElementsFactoryImpl } from '../factories/inputElementsFactoryImpl';
import { FormElementFactory } from '../factories/formElementFactory';
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { FormFactory } from '../factories/formFactory';

export function useFormsServices(): void
{
    useServiceRegistration(FormElementFactory).to(FormElementFactoryImpl).asTransient();
    useServiceRegistration(FormFactory).to(FormFactoryImpl).asTransient();
    useServiceRegistration(InputElementsFactory).to(InputElementsFactoryImpl).asTransient();
}