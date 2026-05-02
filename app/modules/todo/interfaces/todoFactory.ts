import type { ToDo, ToDoData } from "./todo";

export abstract class ToDoFactory
{
    abstract create(data?: Partial<ToDoData>): ToDo;
}