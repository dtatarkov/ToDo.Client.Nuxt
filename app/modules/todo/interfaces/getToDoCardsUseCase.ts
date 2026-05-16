import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ToDoCardData } from '../types/todoCardData';

export abstract class GetToDoCardsUseCase
{
  abstract execute(): Observable<ToDoCardData[]>;
}