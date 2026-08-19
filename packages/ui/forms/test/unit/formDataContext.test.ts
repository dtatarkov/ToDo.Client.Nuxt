import { describe, it, expect } from 'vitest';
import { FormDataContextBase } from '../../src/entities/formDataContextBase';
import { createFormElementViewmodelMock } from '../mocks/formElementViewmodelMock';
import { formStateMock } from '../mocks/formStateMock';
import type { FormElementViewmodel } from '../../src/viewmodels/formElementViewmodel';

function setupFormDataContext(elements: FormElementViewmodel[]): FormDataContextBase<any>
{
    return new FormDataContextBase(elements, formStateMock);
}

describe('getData', () =>
{
    it('should return data from all elements', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const formDataContext = setupFormDataContext(elements);
        const data = formDataContext.getData();

        expect(data).toEqual({
            title: 'Initial Title',
            description: 'Initial Description',
        });
    });

    it('should return empty object when no elements', () =>
    {
        const formDataContext = setupFormDataContext([]);
        const data = formDataContext.getData();

        expect(data).toEqual({});
    });

    it('should return current values when element changes', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const formDataContext = setupFormDataContext(elements);

        elements[0].value = 'Updated Title';
        const data = formDataContext.getData();

        expect(data.title).toBe('Updated Title');
    });
});

describe('setData', () =>
{
    it('should update value of matching form element', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];
        const formDataContext = setupFormDataContext(elements);

        formDataContext.setData({ title: 'New Title' });

        expect(titleElement.value).toBe('New Title');
    });

    it('should reset non-matching elements to default value', () =>
    {
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];
        const formDataContext = setupFormDataContext(elements);

        formDataContext.setData({ title: 'New Title' });

        expect(descriptionElement.setDefaultValue).toHaveBeenCalledTimes(1);
    });

    it('should update state with new data', () =>
    {
        const elements = [
            createFormElementViewmodelMock('title', { value: 'Initial Title' }),
            createFormElementViewmodelMock('description', { value: 'Initial Description' }),
        ];

        const formDataContext = setupFormDataContext(elements);

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
        const titleElement = createFormElementViewmodelMock('title', { value: 'Initial Title' });
        const descriptionElement = createFormElementViewmodelMock('description', { value: 'Initial Description' });

        const elements = [titleElement, descriptionElement];
        const formDataContext = setupFormDataContext(elements);

        formDataContext.setData({});

        expect(titleElement.setDefaultValue).toHaveBeenCalledTimes(1);
        expect(descriptionElement.setDefaultValue).toHaveBeenCalledTimes(1);
    });
});
