import { NotFoundException } from '@client/shared';

export class ToDoNotFoundException extends NotFoundException
{
    constructor(id: string)
    {
        super(`Todo with id ${id} not found`);
    }
}