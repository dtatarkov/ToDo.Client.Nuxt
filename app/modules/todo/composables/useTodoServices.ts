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
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";

export function useTodoServices(): void
{
    registerService(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    registerService(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    registerService(ToDosOwner).to(ToDosOwnerBase).asScoped();
    registerService(ToDosService).to(TodosServiceImpl).asTransient();
    registerService(ToDoElementsFactory).to(ToDoElementsFactoryImpl).asTransient();
}