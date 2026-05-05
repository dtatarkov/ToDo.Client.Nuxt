import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoCardViewmodelData } from './todoCardViewmodel';

export abstract class GetToDoCardsUseCase
{
  abstract execute(): Observable<ToDoCardViewmodelData[]>;
}