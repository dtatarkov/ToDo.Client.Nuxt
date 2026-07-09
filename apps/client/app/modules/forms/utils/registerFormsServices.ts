import type { ServicesContainer } from '@client/di';
import { FormElementsFactoryImpl } from '../factories/formElementsFactoryImpl';
import { FormFactoryImpl } from '../factories/formFactoryImpl';
import { InputElementsFactory } from '../factories/inputElementsFactory';
import { InputElementsFactoryImpl } from '../factories/inputElementsFactoryImpl';
import { FormElementsFactory } from '../factories/formElementsFactory';
import { FormFactory } from '../factories/formFactory';

export function registerFormsServices(container: ServicesContainer): void
{
    container.bind(FormElementsFactory).to(FormElementsFactoryImpl).asTransient();
    container.bind(FormFactory).to(FormFactoryImpl).asTransient();
    container.bind(InputElementsFactory).to(InputElementsFactoryImpl).asTransient();
}
