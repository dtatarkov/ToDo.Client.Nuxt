import type { ServicesContainer } from '@client/infrastructure-di';
import { ToDosRepository, ToDosRepositoryConfiguration } from "../repositories/todosRepository";
import { ToDoDtoMapper } from "../mappers/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDosOwner } from "../entities/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { ToDoFactoryImpl } from '../factories/todoFactoryImpl';
import { ToDoFactory } from '../factories/todoFactory';
import { useRuntimeConfig } from "#imports";

export function registerTodoServices(container: ServicesContainer): void
{
    const config = useRuntimeConfig();

    container.bind(ToDosRepositoryConfiguration)
        .toDynamicValue((): ToDosRepositoryConfiguration =>
        ({
            apiBaseUrl: config.public.apiBaseUrl,
        }))
        .asSingleton();

    container.bind(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    container.bind(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    container.bind(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    container.bind(ToDoFactory).to(ToDoFactoryImpl).asTransient();
}
