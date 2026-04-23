import { NotFoundException } from '@shared/exceptions/notFoundException';

export class ToDoNotFoundException extends NotFoundException
{
    constructor(id: string)
    {
        super(`Todo with id ${id} not found`);
    }
}