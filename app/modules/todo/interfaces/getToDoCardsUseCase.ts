import type { ToDoCardData } from '../types/todoCardData';

export abstract class GetToDoCardsUseCase
{
  abstract execute(): ToDoCardData[];
}