import { describe, it, expect } from 'vitest';
import { FormDataContextBase } from '../../src/entities/formDataContextBase';
import { createFormElementMock } from '../mocks/formElementMock';
import { formStateMock } from '../mocks/formStateMock';
import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';
import type { FormState } from '../../src';

function setupFormDataContext(elements: FormElementViewmodel[], state: ObservableViewmodelState<FormState>): FormDataContextBase<any>
{
    return new FormDataContextBase(elements, state);
}

describe('FormDataContext', () =>
{
    describe('getData', () =>
    {
        it('should return data from all elements', () =>
        {
            const elements = [
                createFormElementMock('title', 'Initial Title'),
                createFormElementMock('description', 'Initial Description'),
            ];

            const formDataContext = setupFormDataContext(elements, formStateMock);
            const data = formDataContext.getData();

            expect(data).toEqual({
                title: 'Initial Title',
                description: 'Initial Description',
            });
        });

        it('should return empty object when no elements', () =>
        {
            const formDataContext = setupFormDataContext([], formStateMock);
            const data = formDataContext.getData();

            expect(data).toEqual({});
        });

        it('should return current values when element changes', () =>
        {
            const elements = [
                createFormElementMock('title', 'Initial Title'),
                createFormElementMock('description', 'Initial Description'),
            ];

            const formDataContext = setupFormDataContext(elements, formStateMock);

            elements[0].value = 'Updated Title';
            const data = formDataContext.getData();

            expect(data.title).toBe('Updated Title');
        });
    });

    describe('setData', () =>
    {
        it('should update value of matching form element', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];
            const formDataContext = setupFormDataContext(elements, formStateMock);

            formDataContext.setData({ title: 'New Title' });

            expect(titleElement.value).toBe('New Title');
        });

        it('should reset non-matching elements to default value', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];
            const formDataContext = setupFormDataContext(elements, formStateMock);

            formDataContext.setData({ title: 'New Title' });

            expect(descriptionElement.setDefaultValue).toHaveBeenCalledTimes(1);
        });

        it('should update state with new data', () =>
        {
            const elements = [
                createFormElementMock('title', 'Initial Title'),
                createFormElementMock('description', 'Initial Description'),
            ];

            const formDataContext = setupFormDataContext(elements, formStateMock);

            formDataContext.setData({
                title: 'New Title',
                description: 'New Description'
            });

            expect(formStateMock.update).toBeCalledWith(expect.objectContaining({
                elements: [
                    expect.objectContaining({ name: 'title' }),
                    expect.objectContaining({ name: 'description' })
                ]
            }));
        });

        it('should handle empty changeData object', () =>
        {
            const titleElement = createFormElementMock('title', 'Initial Title');
            const descriptionElement = createFormElementMock('description', 'Initial Description');

            const elements = [titleElement, descriptionElement];
            const formDataContext = setupFormDataContext(elements, formStateMock);

            formDataContext.setData({});

            expect(titleElement.setDefaultValue).toHaveBeenCalledTimes(1);
            expect(descriptionElement.setDefaultValue).toHaveBeenCalledTimes(1);
        });
    });
});
