import { ToDosRepository } from "../app/interfaces/todosRepository";
import { ToDoDtoMapper } from "../app/interfaces/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../app/mappers/todoDtoMapperImpl";
import { ToDosOwner } from "../app/interfaces/todosOwner";
import { ToDosOwnerBase } from "../app/entities/todosOwnerBase";
import { ToDosService } from "../app/interfaces/todosService";
import { ToDosRepositoryImpl } from "../app/repositories/todosRepositoryImpl";
import { TodosServiceImpl } from "../app/services/todosServiceImpl";
import { ToDoElementsFactory } from "../app/interfaces/todoElementsFactory";
import { ToDoElementsFactoryImpl } from "../app/factories/todoElementsFactoryImpl";
import { DatesService } from '@shared/interfaces/datesService';
import { SSRLoader } from '@shared/interfaces/ssrLoader';
import { OverlayService } from '@overlay/interfaces/overlayService';
import { FormFactory } from '@forms/interfaces/formFactory';

export default defineNuxtPlugin(() =>
{
  registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);

  registerServiceFactory(ToDoDtoMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new ToDoDtoMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDosOwner, () =>
  {
    const todosRepository = getService(ToDosRepository);
    const todoDtoMapper   = getService(ToDoDtoMapper);
    const ssrLoader       = getService(SSRLoader);
    const todoOwner       = new ToDosOwnerBase(todosRepository, todoDtoMapper, ssrLoader);

    return todoOwner;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDosService, () =>
  {
    const todosOwner     = getService(ToDosOwner);
    const overlayService = getService(OverlayService);
    const formFactory    = getService(FormFactory);

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
})