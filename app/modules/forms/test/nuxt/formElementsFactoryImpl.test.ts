import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FormElementsFactoryImpl } from '../../factories/formElementsFactoryImpl';
import { createInputElementTextMock } from '../../mocks/inputElementTextMock';
import { createInputElementTextareaMock } from '../../mocks/inputElementTextareaMock';
import { createInputElementDateTimeMock } from '../../mocks/inputElementDateTimeMock';
import { inputElementsFactoryMock } from '../../mocks/inputElementsFactoryMock';
import { EntityScheme } from '@/modules/entitySchemes/entities/entityScheme';

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
        it('should return empty array for empty scheme', () =>
        {
            const scheme = EntityScheme.create(() => ({}));

            const elements = factory.createElements(scheme);

            expect(elements).toEqual([]);
        });

        describe('string field', () =>
        {
            it('should create input text element with minimal scheme', () =>
            {
                const inputText = createInputElementTextMock();
                inputElementsFactoryMock.createInputText.mockReturnValue(inputText);

                const scheme = EntityScheme.create(scheme => ({
                    title: scheme.string()
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(1);
                expect(inputElementsFactoryMock.createTextarea).not.toHaveBeenCalled();
            });

            it('should create input text element with full scheme', () =>
            {
                const inputText = createInputElementTextMock();
                inputElementsFactoryMock.createInputText.mockReturnValue(inputText);

                const scheme = EntityScheme.create(scheme => ({
                    title: scheme.string()
                        .withLabel('Title')
                        .withPlaceholder('Enter title')
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('Title');
                expect(inputText.placeholder).toBe('Enter title');
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(1);
            });

            it('should support rendering multiple input text elements', () =>
            {
                const inputText1 = createInputElementTextMock();
                const inputText2 = createInputElementTextMock();

                inputElementsFactoryMock.createInputText
                    .mockReturnValueOnce(inputText1)
                    .mockReturnValueOnce(inputText2);

                const scheme = EntityScheme.create(scheme => ({
                    title: scheme.string()
                        .withLabel('Title')
                        .withPlaceholder('Enter title'),

                    description: scheme.string()
                        .withLabel('Description')
                        .withPlaceholder('Enter description')
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('title');
                expect(elements[0]?.label).toBe('Title');
                expect(inputText1.placeholder).toBe('Enter title');
                expect(elements[1]?.name).toBe('description');
                expect(elements[1]?.label).toBe('Description');
                expect(inputText2.placeholder).toBe('Enter description');
                expect(inputElementsFactoryMock.createInputText).toHaveBeenCalledTimes(2);
            });
        });

        describe('long string field', () =>
        {
            it('should create textarea element with minimal scheme', () =>
            {
                const textarea = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);

                const scheme = EntityScheme.create(scheme => ({
                    description: scheme.string().isLong()
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(1);
                expect(inputElementsFactoryMock.createInputText).not.toHaveBeenCalled();
            });

            it('should create textarea element with full scheme', () =>
            {
                const textarea = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);

                const scheme = EntityScheme.create(scheme => ({
                    description: scheme.string()
                        .withLabel('Description')
                        .withPlaceholder('Enter description')
                        .isLong()
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('Description');
                expect(textarea.placeholder).toBe('Enter description');
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(1);
            });

            it('should support rendering multiple textarea elements', () =>
            {
                const textarea1 = createInputElementTextareaMock();
                const textarea2 = createInputElementTextareaMock();
                inputElementsFactoryMock.createTextarea
                    .mockReturnValueOnce(textarea1)
                    .mockReturnValueOnce(textarea2);

                const scheme = EntityScheme.create(scheme => ({
                    description: scheme.string()
                        .withLabel('Description')
                        .withPlaceholder('Enter description')
                        .isLong(),

                    notes: scheme.string()
                        .withLabel('Notes')
                        .withPlaceholder('Enter notes')
                        .isLong()
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('description');
                expect(elements[0]?.label).toBe('Description');
                expect(textarea1.placeholder).toBe('Enter description');
                expect(elements[1]?.name).toBe('notes');
                expect(elements[1]?.label).toBe('Notes');
                expect(textarea2.placeholder).toBe('Enter notes');
                expect(inputElementsFactoryMock.createTextarea).toHaveBeenCalledTimes(2);
            });
        });

        describe('datetime field', () =>
        {
            it('should create datetime input element with minimal scheme', () =>
            {
                const inputDateTime = createInputElementDateTimeMock();
                inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

                const scheme = EntityScheme.create(scheme => ({
                    createdAt: scheme.datetime()
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(1);
                expect(elements[0]?.name).toBe('createdAt');
                expect(elements[0]?.label).toBe('');
                expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(1);
            });

            it('should create datetime input element with full scheme', () =>
            {
                const inputDateTime = createInputElementDateTimeMock();
                inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

                const scheme = EntityScheme.create(scheme => ({
                    createdAt: scheme.datetime()
                        .withLabel('Created At')
                }));

                const elements = factory.createElements(scheme);

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

                const scheme = EntityScheme.create(scheme => ({
                    createdAt: scheme.datetime()
                        .withLabel('Created At'),

                    updatedAt: scheme.datetime()
                        .withLabel('Updated At')
                }));

                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(2);
                expect(elements[0]?.name).toBe('createdAt');
                expect(elements[0]?.label).toBe('Created At');
                expect(elements[1]?.name).toBe('updatedAt');
                expect(elements[1]?.label).toBe('Updated At');
                expect(inputElementsFactoryMock.createInputDateTime).toHaveBeenCalledTimes(2);
            });
        });

        describe('hidden field', () =>
        {
            it('should skip hidden fields', () =>
            {
                const scheme = EntityScheme.create(scheme => ({
                    id: scheme.hidden(),
                }));


                const elements = factory.createElements(scheme);

                expect(elements).toHaveLength(0);
            });
        });

        it('should handle mixed scheme with multiple field types', () =>
        {
            const inputText = createInputElementTextMock();
            const textarea = createInputElementTextareaMock();
            const inputDateTime = createInputElementDateTimeMock();
            inputElementsFactoryMock.createInputText.mockReturnValue(inputText);
            inputElementsFactoryMock.createTextarea.mockReturnValue(textarea);
            inputElementsFactoryMock.createInputDateTime.mockReturnValue(inputDateTime);

            const scheme = EntityScheme.create(scheme => ({
                id: scheme.hidden(),

                title: scheme.string()
                    .withLabel('Title')
                    .withPlaceholder('Enter title'),

                description: scheme.string()
                    .withLabel('Description')
                    .withPlaceholder('Enter description')
                    .isLong(),

                createdAt: scheme.datetime()
                    .withLabel('Created At'),
            }));

            const elements = factory.createElements(scheme);

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