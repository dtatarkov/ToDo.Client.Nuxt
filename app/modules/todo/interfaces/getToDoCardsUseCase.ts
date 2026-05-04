import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';

export abstract class GetToDoCardsUseCase
{
  abstract execute(): Observable<ToDoCardDataWithIdentity[]>;
}