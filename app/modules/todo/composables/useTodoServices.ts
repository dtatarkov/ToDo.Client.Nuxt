import { ToDosRepository } from "../repositories/todosRepository";
import { ToDoDtoMapper } from "../mappers/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDoCardDataMapper } from "../mappers/todoCardDataMapper";
import { ToDoCardDataMapperImpl } from "../mappers/todoCardDataMapperImpl";
import { ToDosOwner } from "../entities/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ToDoFactoryImpl } from '../factories/todoFactoryImpl';
import { ToDoFactory } from '../factories/todoFactory';
import { InitializeToDosUseCase } from "../usecases/initializeToDosUseCase";
import { InitializeToDosUseCaseImpl } from "../usecases/initializeToDosUseCaseImpl";
import { CreateToDoUseCase } from "../usecases/createToDoUseCase";
import { EditToDoUseCase } from "../usecases/editToDoUseCase";
import { CreateToDoUseCaseImpl } from "../usecases/createToDoUseCaseImpl";
import { EditToDoUseCaseImpl } from "../usecases/editToDoUseCaseImpl";
import { GetToDoCardsUseCase } from "../usecases/getToDoCardsUseCase";
import { GetToDoCardsUseCaseImpl } from "../usecases/getToDoCardsUseCaseImpl";

export function useTodoServices(): void
{
    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDoCardDataMapper).to(ToDoCardDataMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    useServiceRegistration(ToDoFactory).to(ToDoFactoryImpl).asTransient();
    useServiceRegistration(InitializeToDosUseCase).to(InitializeToDosUseCaseImpl).asTransient();
    useServiceRegistration(CreateToDoUseCase).to(CreateToDoUseCaseImpl).asTransient();
    useServiceRegistration(EditToDoUseCase).to(EditToDoUseCaseImpl).asTransient();
    useServiceRegistration(GetToDoCardsUseCase).to(GetToDoCardsUseCaseImpl).asTransient();
}