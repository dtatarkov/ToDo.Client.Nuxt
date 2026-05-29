import type { Ref } from 'vue';
import type { ToDoCardData } from '../types/todoCardData';

export abstract class GetToDoCardsUseCase
{
  abstract execute(): Ref<ToDoCardData[]>;
}