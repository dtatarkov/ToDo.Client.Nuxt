import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateToDoUseCaseImpl } from '../../usecases/createToDoUseCaseImpl';
import { todosOwnerMock } from '../../mocks/todoOwnerMock';
import { formViewmodelFactoryMock as formFactoryMock } from '@/modules/forms/mocks/formViewmodelFactoryMock';
import { overlayServiceMock } from '@/modules/overlay/mocks/overlayServiceMock';
import { createMockToDo } from '../../mocks/todoMock';
import { formMock } from '../../../forms/mocks/formMock';
import { FormElementType } from '@/modules/forms/enums/formElementType';
import { modalConfirmMock } from '../../../overlay/mocks/modalConfirmMock';

// Reset mocks before each test
describe('CreateToDoUseCaseImpl', () =>
{
    const useCase = new CreateToDoUseCaseImpl(
        todosOwnerMock,
        formFactoryMock,
        overlayServiceMock
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();

        const todo = createMockToDo();

        // Setup mocks
        formFactoryMock.create.mockReturnValue(formMock);
        overlayServiceMock.addModalConfirmForm.mockReturnValue(modalConfirmMock);
        todosOwnerMock.createToDo.mockReturnValue(todo);
    });

    describe('execute', () =>
    {
        it('should create a new todo', () =>
        {
            useCase.execute();

            expect(todosOwnerMock.createToDo).toHaveBeenCalledTimes(1);
        });

        it('should create a form with the correct elements', () =>
        {
            useCase.execute();

            expect(formFactoryMock.create).toHaveBeenCalledTimes(1);
            expect(formMock.setElements).toHaveBeenCalledTimes(1);

            //@ts-expect-error data will be there
            const setElementsArgs = formMock.setElements.mock.calls[0][0];

            expect(setElementsArgs).toHaveProperty('title');
            expect(setElementsArgs.title.type).toBe(FormElementType.inputText);
            expect(setElementsArgs.title.label).toBe('Название задачи');

            expect(setElementsArgs).toHaveProperty('description');
            expect(setElementsArgs.description.type).toBe(FormElementType.textarea);
            expect(setElementsArgs.description.label).toBe('Описание задачи');

            expect(setElementsArgs).toHaveProperty('completionDatePlanned');
            expect(setElementsArgs.completionDatePlanned.type).toBe(FormElementType.inputDateTime);
            expect(setElementsArgs.completionDatePlanned.label).toBe('Плановая дата выполнения');
        });

        it('should set form data from todo', () =>
        {
            useCase.execute();

            expect(formMock.setData).toHaveBeenCalledTimes(1);
        });
    });
});