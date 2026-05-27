import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EditToDoUseCaseImpl } from '../../usecases/editToDoUseCaseImpl';
import { ToDoNotFoundException } from '../../exceptions/toDoNotFoundException';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formFactoryMock';
import { createMockToDo } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { modalMock } from '../../../overlay/mocks/modalMock';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { addFormModalUseCaseMock } from '@/modules/overlay/mocks/addFormModalUseCaseMock';

describe('EditToDoUseCaseImpl', () =>
{
    const useCase = new EditToDoUseCaseImpl(
        todosOwnerMock,
        formFactoryMock,
        addFormModalUseCaseMock
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        addFormModalUseCaseMock.execute.mockReturnValue(modalMock);
    });

    describe('executeAsync', () =>
    {
        it('should fetch todo by id and create edit form', async () =>
        {
            const todo = createMockToDo({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledTimes(1);
            expect(todosOwnerMock.getToDoByIdAsync).toHaveBeenCalledWith('123');
            expect(formFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(addFormModalUseCaseMock.execute).toHaveBeenCalledTimes(1);
            expect(addFormModalUseCaseMock.execute).toHaveBeenCalledWith(formMock);
        });

        it('should throw ToDoNotFoundException for non-existent todo', async () =>
        {
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(undefined);

            await expect(useCase.executeAsync('999')).rejects.toThrow(ToDoNotFoundException);
        });

        it('should create a form with the correct elements', async () =>
        {
            const todo = createMockToDo({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(formMock.setElements).toHaveBeenCalledTimes(1);

            //@ts-expect-error data will be there
            const setElementsArgs = formMock.setElements.mock.calls[0][0];

            expect(setElementsArgs).toHaveProperty('title');
            expect(setElementsArgs.title.type).toBe(FormElementType.inputText);
            expect(setElementsArgs.title.label).toBe('Название задачи');
            expect(setElementsArgs.title.placeholder).toBe('Введите название задачи');

            expect(setElementsArgs).toHaveProperty('description');
            expect(setElementsArgs.description.type).toBe(FormElementType.textarea);
            expect(setElementsArgs.description.label).toBe('Описание задачи');
            expect(setElementsArgs.description.placeholder).toBe('Введите описание задачи');

            expect(setElementsArgs).toHaveProperty('completionDatePlanned');
            expect(setElementsArgs.completionDatePlanned.type).toBe(FormElementType.inputDateTime);
            expect(setElementsArgs.completionDatePlanned.label).toBe('Плановая дата выполнения');
        });

        it('should set form data from todo', async () =>
        {
            const todo = createMockToDo({ id: '123' });
            todosOwnerMock.getToDoByIdAsync.mockResolvedValue(todo);

            await useCase.executeAsync('123');

            expect(formMock.setData).toHaveBeenCalledTimes(1);
            expect(formMock.setData).toHaveBeenCalledWith(todo.getData());
        });
    });
});