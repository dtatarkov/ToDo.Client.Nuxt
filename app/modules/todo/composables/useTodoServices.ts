import { ToDosRepository, ToDosRepositoryConfiguration } from "../repositories/todosRepository";
import { ToDoDtoMapper } from "../mappers/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDosOwner } from "../entities/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { ToDoFactoryImpl } from '../factories/todoFactoryImpl';
import { ToDoFactory } from '../factories/todoFactory';
import { useRuntimeConfig } from "#imports";

export function useTodoServices(): void
{
    const config = useRuntimeConfig();

    useServiceRegistration(ToDosRepositoryConfiguration)
        .toDynamicValue((): ToDosRepositoryConfiguration =>
        ({
            apiBaseUrl: config.public.apiBaseUrl,
        }))
        .asSingleton();

    useServiceRegistration(ToDosRepository).to(ToDosRepositoryImpl).asTransient();
    useServiceRegistration(ToDoDtoMapper).to(ToDoDtoMapperImpl).asTransient();
    useServiceRegistration(ToDosOwner).to(ToDosOwnerBase).asSingleton();
    useServiceRegistration(ToDoFactory).to(ToDoFactoryImpl).asTransient();
}