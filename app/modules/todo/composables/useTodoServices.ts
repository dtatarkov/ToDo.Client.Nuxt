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
import { ShowAddToDoDialogUseCase } from "../interfaces/showAddToDoDialogUseCase";
import { ShowEditToDoDialogUseCase } from "../interfaces/showEditToDoDialogUseCase";
import { ShowAddToDoDialogUseCaseImpl } from "../usecases/showAddToDoDialogUseCaseImpl";
import { ShowEditToDoDialogUseCaseImpl } from "../usecases/showEditToDoDialogUseCaseImpl";
import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import { GetToDoCardsUseCaseImpl } from "../usecases/getToDoCardsUseCaseImpl";

export function useTodoServices(): void
{
    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDoCardDataMapper).to(ToDoCardDataMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asScoped();
    useServiceRegistration(ToDoViewmodelsFactory).to(ToDoViewmodelsFactoryImpl).asTransient();
    useServiceRegistration(ToDoFactory).to(ToDoFactoryImpl).asTransient();
    useServiceRegistration(ToDosWidgetViewmodel).to(ToDosWidgetViewmodelImpl).asTransient();
    useServiceRegistration(InitializeToDosUseCase).to(InitializeToDosUseCaseImpl).asTransient();
    useServiceRegistration(ShowAddToDoDialogUseCase).to(ShowAddToDoDialogUseCaseImpl).asTransient();
    useServiceRegistration(ShowEditToDoDialogUseCase).to(ShowEditToDoDialogUseCaseImpl).asTransient();
    useServiceRegistration(GetToDoCardsUseCase).to(GetToDoCardsUseCaseImpl).asTransient();
}