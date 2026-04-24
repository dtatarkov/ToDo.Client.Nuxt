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
import { DatesService } from "@/modules/shared/interfaces/datesService";
import { SSRLoader } from "@/modules/shared/interfaces/ssrLoader";
import { OverlayService } from "@/modules/overlay/interfaces/overlayService";
import { FormFactory } from "@/modules/forms/interfaces/formFactory";
import { ServiceScope } from "@/modules/shared/enums/serviceScope";
import { registerService } from "@/modules/shared/utils/registerService";
import { getService } from "@/modules/shared/utils/getService";
import { registerServiceFactory } from '@/modules/shared/utils/registerServiceFactory';

export function useTodoServices(): void
{
    registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);

    registerServiceFactory(ToDoDtoMapper, () =>
    {
        const datesService = getService(DatesService);
        const mapper = new ToDoDtoMapperImpl(datesService);

        return mapper;
    }, ServiceScope.Singleton);

    registerServiceFactory(ToDosOwner, () =>
    {
        const todosRepository = getService(ToDosRepository);
        const todoDtoMapper = getService(ToDoDtoMapper);
        const ssrLoader = getService(SSRLoader);
        const todoOwner = new ToDosOwnerBase(todosRepository, todoDtoMapper, ssrLoader);

        return todoOwner;
    }, ServiceScope.Singleton);

    registerServiceFactory(ToDosService, () =>
    {
        const todosOwner = getService(ToDosOwner);
        const overlayService = getService(OverlayService);
        const formFactory = getService(FormFactory);

        const todosService = new TodosServiceImpl(todosOwner, overlayService, formFactory);

        return todosService;
    }, ServiceScope.Singleton);

    registerServiceFactory(ToDoElementsFactory, () =>
    {
        const todosService = getService(ToDosService);
        const datesService = getService(DatesService);

        const result = new ToDoElementsFactoryImpl(todosService, datesService);

        return result;
    });
}