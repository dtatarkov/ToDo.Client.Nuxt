import { FormElementsFactoryImpl } from '../factories/formElementsFactoryImpl';
import { FormFactoryImpl } from '../factories/formFactoryImpl';
import { InputElementsFactory } from '../factories/inputElementsFactory';
import { InputElementsFactoryImpl } from '../factories/inputElementsFactoryImpl';
import { FormElementsFactory } from '../factories/formElementsFactory';
import { FormFactory } from '../factories/formFactory';

export function useFormsServices(): void
{
    useServiceRegistration(FormElementsFactory).to(FormElementsFactoryImpl).asTransient();
    useServiceRegistration(FormFactory).to(FormFactoryImpl).asTransient();
    useServiceRegistration(InputElementsFactory).to(InputElementsFactoryImpl).asTransient();
}