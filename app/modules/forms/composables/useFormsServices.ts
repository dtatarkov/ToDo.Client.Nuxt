import { FormElementViewmodelFactoryImpl } from '../factories/formElementViewmodelFactoryImpl';
import { FormViewmodelFactoryImpl } from '../factories/formViewmodelFactoryImpl';
import { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import { FormViewmodelFactory } from "../interfaces/formViewmodelFactory";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useFormsServices(): void
{
    useServiceRegistration(FormElementViewmodelFactory).to(FormElementViewmodelFactoryImpl).asTransient();
    useServiceRegistration(FormViewmodelFactory).to(FormViewmodelFactoryImpl).asTransient();
}