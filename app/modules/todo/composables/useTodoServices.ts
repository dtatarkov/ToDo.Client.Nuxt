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
import { ServiceScope } from "@/modules/shared/enums/serviceScope";
import { registerService } from "@/modules/shared/serviceLocator/serviceLocator";

export function useTodoServices(): void
{
    registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);
    registerService(ToDoDtoMapper, ToDoDtoMapperImpl, ServiceScope.Singleton);
    registerService(ToDosOwner, ToDosOwnerBase, ServiceScope.Singleton);
    registerService(ToDosService, TodosServiceImpl, ServiceScope.Singleton);
    registerService(ToDoElementsFactory, ToDoElementsFactoryImpl);
}