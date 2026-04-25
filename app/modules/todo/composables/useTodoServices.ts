import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosService } from "../interfaces/todosService";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { TodosServiceImpl } from "../services/todosServiceImpl";
import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDoElementsFactoryImpl } from "../factories/todoElementsFactoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';

export function useTodoServices(): void
{
    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asScoped();
    useServiceRegistration(ToDosService).to(TodosServiceImpl).asTransient();
    useServiceRegistration(ToDoElementsFactory).to(ToDoElementsFactoryImpl).asTransient();
}