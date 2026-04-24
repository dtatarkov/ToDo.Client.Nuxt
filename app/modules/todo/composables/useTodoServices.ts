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
    registerService(ToDosRepository, ToDosRepositoryImpl).asSingleton();
    registerService(ToDoDtoMapper, ToDoDtoMapperImpl).asSingleton();
    registerService(ToDosOwner, ToDosOwnerBase).asSingleton();
    registerService(ToDosService, TodosServiceImpl).asSingleton();
    registerService(ToDoElementsFactory, ToDoElementsFactoryImpl);
}