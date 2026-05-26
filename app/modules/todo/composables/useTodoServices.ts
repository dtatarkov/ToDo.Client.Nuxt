import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import { ToDoCardDataMapperImpl } from "../mappers/todoCardDataMapperImpl";
import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { ToDoViewmodelsFactory } from "../interfaces/todoViewmodelsFactory";
import { ToDoViewmodelsFactoryImpl } from "../factories/todoViewmodelsFactoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ToDoFactoryImpl } from '../factories/todoFactoryImpl';
import { ToDoFactory } from '../interfaces/todoFactory';
import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { ToDosWidgetViewmodelImpl } from "../viewmodels/todosWidgetViewmodelImpl";
import { InitializeToDosUseCase } from "../interfaces/initializeToDosUseCase";
import { InitializeToDosUseCaseImpl } from "../usecases/initializeToDosUseCaseImpl";
import { CreateToDoUseCase } from "../usecases/createToDoUseCase";
import { EditToDoUseCase } from "../usecases/editToDoUseCase";
import { CreateToDoUseCaseImpl } from "../usecases/createToDoUseCaseImpl";
import { EditToDoUseCaseImpl } from "../usecases/editToDoUseCaseImpl";
import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import { GetToDoCardsUseCaseImpl } from "../usecases/getToDoCardsUseCaseImpl";
import { ButtonsFactoryImpl } from '@/modules/uikit/factories/buttonsFactoryImpl';
import { ButtonsFactory } from '@/modules/uikit/interfaces/buttonsFactory';

export function useTodoServices(): void
{
    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDoCardDataMapper).to(ToDoCardDataMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    useServiceRegistration(ToDoViewmodelsFactory).to(ToDoViewmodelsFactoryImpl).asTransient();
    useServiceRegistration(ToDoFactory).to(ToDoFactoryImpl).asTransient();
    useServiceRegistration(ToDosWidgetViewmodel).to(ToDosWidgetViewmodelImpl).asTransient();
    useServiceRegistration(InitializeToDosUseCase).to(InitializeToDosUseCaseImpl).asTransient();
    useServiceRegistration(CreateToDoUseCase).to(CreateToDoUseCaseImpl).asTransient();
    useServiceRegistration(EditToDoUseCase).to(EditToDoUseCaseImpl).asTransient();
    useServiceRegistration(GetToDoCardsUseCase).to(GetToDoCardsUseCaseImpl).asTransient();
    useServiceRegistration(ButtonsFactory).to(ButtonsFactoryImpl).asTransient();
}