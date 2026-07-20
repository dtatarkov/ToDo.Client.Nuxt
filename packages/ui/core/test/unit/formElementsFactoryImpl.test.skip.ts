import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormElementsFactoryImpl } from '../../src/factories/formElementsFactoryImpl';
import { createInputElementTextMock } from '../mocks/inputElementTextMock';
import { createInputElementTextareaMock } from '../mocks/inputElementTextareaMock';
import { createInputElementDateTimeMock } from '../mocks/inputElementDateTimeMock';
import { inputElementsFactoryMock } from '../mocks/inputElementsFactoryMock';
import { FormElementType } from '../../src/enums/formElementType';
import type { FormElementData } from '../../src/types/formElementData';

describe('FormElementsFactoryImpl', () =>
{
    const factory = new FormElementsFactoryImpl(
        inputElementsFactoryMock,
    );

    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('createElements', () =>
    {
        it('should return empty array for empty data', () =>
        {
            const data: Record<string, FormElementData> = {};

            const elements = factory.createElements(data);

            expect(elements).toEqual([]);
        });

        describe('string field', () =>
        {
            it('should create input text element with minimal data', () =>
            {
                const inputText = createInputElementTextMock();
                inputElementsFactoryMock.createInputText.mockReturnValue(inputText);

                const data: Record<string, FormElementData> = {
                    title: {
                        type: FormElementType.inputText,
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(1);
                expect(inputElementsFactoryMock.createTextarea).not.toHaveBeenCalled();
            });

            it('should create input text element with full data', () =>
            {
                const inputText = createInputElementTextMock();
                inputElementsFactoryMock.createInputText.mockReturnValue(inputText);

                const data: Record<string, FormElementData> = {
                    title: {
                        type: FormElementType.inputText,
                        labelKey: 'todo.field.title.label',
                        placeholderKey: 'todo.field.description.placeholder',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('Title');
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(1);
                expect(inputText.setData).toBeCalledWith(data.title);
            });

            it('should support rendering multiple input text elements', () =>
            {
                const inputText1 = createInputElementTextMock();
                const inputText2 = createInputElementTextMock();

                inputElementsFactoryMock.createInputText
                    .mockReturnValueOnce(inputText1)
                    .mockReturnValueOnce(inputText2);

                const data: Record<string, FormElementData> = {
                    title: {
                        type: FormElementType.inputText,
                        labelKey: 'todo.field.title.label',
                        placeholderKey: 'todo.field.title.placeholder',
                    },
                    description: {
                        type: FormElementType.inputText,
                        labelKey: 'todo.field.description.label',
                        placeholderKey: 'todo.field.description.placeholder',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('Title');
                expect(inputText1.setData).toBeCalledWith(data.title);
                expect(elements[1]?.name).toBe('description');
                expect(elements[1]?.label).toBe('Description');
                expect(inputText2.setData).toBeCalledWith(data.description);
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(2);
            });
        });

        describe('long string field', () =>
        {
            it('should create textarea element with minimal data', () =>
            {
                const textarea = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);

                const data: Record<string, FormElementData> = {
                    description: {
                        type: FormElementType.inputTextarea
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(1);
                expect(inputElementsFactoryMock.createInputText).not.toHaveBeenCalled();
            });

            it('should create textarea element with full data', () =>
            {
                const textarea = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);

                const data: Record<string, FormElementData> = {
                    description: {
                        type: FormElementType.inputTextarea,
                        labelKey: 'todo.field.description.label',
                        placeholderKey: 'todo.field.description.placeholder',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('Description');
                expect(textarea.setData).toBeCalledWith(data.description);
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(1);
            });

            it('should support rendering multiple textarea elements', () =>
            {
                const textarea1 = createInputElementTextareaMock();
                const textarea2 = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea
                    .mockReturnValueOnce(textarea1)
                    .mockReturnValueOnce(textarea2);

                const data: Record<string, FormElementData> = {
                    description: {
                        type: FormElementType.inputTextarea,
                        labelKey: 'todo.field.description.label',
                        placeholderKey: 'todo.field.description.placeholder',
                    },
                    notes: {
                        type: FormElementType.inputTextarea,
                        labelKey: 'todo.field.title.label',
                        placeholderKey: 'todo.field.title.placeholder',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('Description');
                expect(textarea1.setData).toBeCalledWith(data.description);
                expect(elements[1]?.name).toBe('notes');
                expect(elements[1]?.label).toBe('Notes');
                expect(textarea2.setData).toBeCalledWith(data.notes);
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(2);
            });
        });

        describe('datetime field', () =>
        {
            it('should create datetime input element with minimal data', () =>
            {
                const inputDateTime = createInputElementDateTimeMock();
                inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

                const data: Record<string, FormElementData> = {
                    createdAt: {
                        type: FormElementType.inputDateTime,
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('createdAt');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(1);
            });

            it('should create datetime input element with full data', () =>
            {
                const inputDateTime = createInputElementDateTimeMock();
                inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

                const data: Record<string, FormElementData> = {
                    createdAt: {
                        type: FormElementType.inputDateTime,
                        labelKey: 'todo.field.completionDatePlanned.label',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('createdAt');
                expect(elements[0]?.label).toBe('Created At');
                expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(1);
            });

            it('should support rendering multiple datetime input elements', () =>
            {
                const inputDateTime1 = createInputElementDateTimeMock();
                const inputDateTime2 = createInputElementDateTimeMock();
                inputElementsFactoryMock.createInputDateTime
                    .mockReturnValueOnce(inputDateTime1)
                    .mockReturnValueOnce(inputDateTime2);

                const data: Record<string, FormElementData> = {
                    createdAt: {
                        type: FormElementType.inputDateTime,
                        labelKey: 'todo.field.completionDatePlanned.label',
                    },
                    updatedAt: {
                        type: FormElementType.inputDateTime,
                        labelKey: 'todo.field.completionDatePlanned.label',
                    }
                };

                const elements = factory.createElements(data);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('createdAt');
                expect(elements[0]?.label).toBe('Created At');
                expect(elements[1]?.name).toBe('updatedAt');
                expect(elements[1]?.label).toBe('Updated At');
                expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(2);
            });
        });

        it('should handle mixed data with multiple field types', () =>
        {
            const inputText = createInputElementTextMock();
            const textarea = createInputElementTextareaMock();
            const inputDateTime = createInputElementDateTimeMock();
            inputElementsFactoryMock.createInputText.mockReturnValue(inputText);
            inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);
            inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

            const data: Record<string, FormElementData> = {
                title: {
                    type: FormElementType.inputText,
                    labelKey: 'todo.field.title.label',
                    placeholderKey: 'todo.field.title.placeholder',
                },
                description: {
                    type: FormElementType.inputTextarea,
                    labelKey: 'todo.field.description.label',
                    placeholderKey: 'todo.field.description.placeholder',
                },
                createdAt: {
                    type: FormElementType.inputDateTime,
                    labelKey: 'todo.field.completionDatePlanned.label',
                },
            };

            const elements = factory.createElements(data);

            expect(elements).toHaveLength(3);
            expect(elements[0]?.name).toBe('title');
            expect(elements[0]?.label).toBe('Title');
            expect(elements[1]?.name).toBe('description');
            expect(elements[1]?.label).toBe('Description');
            expect(elements[2]?.name).toBe('createdAt');
            expect(elements[2]?.label).toBe('Created At');
            expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(1);
            expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(1);
            expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(1);
        });
    });
});