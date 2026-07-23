import { describe, it, expect } from 'vitest';
import { FormConfiguration } from '../../src/configuration/formConfiguration';
import { FormElementType } from '../../src/enums/formElementType';
import type { FormElementData } from '../../src/types/formElementData';
import type { InputTextData } from '../../src/types/inputTextData';

describe('FormConfiguration', () =>
{
    describe('withData', () =>
    {
        it('should update element values with provided data', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: 'default-title',
                },
                description: {
                    type: FormElementType.inputTextarea,
                    value: 'default-desc',
                },
            });

            const updatedConfig = config.withData({ title: 'new-title' });

            expect(updatedConfig.elements.title.value).toBe('new-title');
            expect(updatedConfig.elements.description.value).toBe('default-desc');
        });

        it('should update multiple element values', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: 'default-title',
                },
                description: {
                    type: FormElementType.inputTextarea,
                    value: 'default-desc',
                },
            });

            const updatedConfig = config.withData({
                title: 'new-title',
                description: 'new-desc',
            });

            expect(updatedConfig.elements.title.value).toBe('new-title');
            expect(updatedConfig.elements.description.value).toBe('new-desc');
        });

        it('should return a new instance', () =>
        {
            const elements: Record<string, FormElementData> = {
                title: {
                    type: FormElementType.inputText,
                    value: '',
                },
            };

            const config = new FormConfiguration(elements);
            const updatedConfig = config.withData({ title: 'new' });

            expect(updatedConfig).not.toBe(config);
        });

        it('should not modify the original configuration when updating data', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: 'default-title',
                },
                description: {
                    type: FormElementType.inputTextarea,
                    value: 'default-desc',
                },
            });

            const originalTitleValue = config.elements.title.value;
            const originalDescriptionValue = config.elements.description.value;

            config.withData({ title: 'new-title' });

            expect(config.elements.title.value).toBe(originalTitleValue);
            expect(config.elements.description.value).toBe(originalDescriptionValue);
        });

        it('should preserve other element properties', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: 'default',
                    labelKey: 'todo.field.title.label',
                    placeholderKey: 'todo.field.title.placeholder',
                    errorKey: 'todo.field.title.errors.empty',
                }
            });

            const updatedConfig = config.withData({ title: 'new-value' });

            expect(updatedConfig.elements.title.type).toBe(FormElementType.inputText);
            expect(updatedConfig.elements.title.labelKey).toBe('todo.field.title.label');
            expect((<InputTextData>updatedConfig.elements.title).placeholderKey).toBe('todo.field.title.placeholder');
            expect(updatedConfig.elements.title.errorKey).toBe('todo.field.title.errors.empty');
        });
    });

    describe('withErrors', () =>
    {
        it('should set error for element when error key is provided', () =>
        {
            const elements: Record<string, FormElementData> = {
                title: {
                    type: FormElementType.inputText,
                    value: '',
                },
            };

            const config = new FormConfiguration(elements);
            const updatedConfig = config.withErrors({ title: 'todo.field.title.errors.empty' });

            expect(updatedConfig.elements.title.errorKey).toBe('todo.field.title.errors.empty');
            expect(updatedConfig.elements.title.hasError).toBe(true);
        });

        it('should not set error for elements without errors', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: '',
                },
                description: {
                    type: FormElementType.inputTextarea,
                    value: '',
                },
            });

            const updatedConfig = config.withErrors({ title: 'todo.field.title.errors.empty' });

            expect(updatedConfig.elements.title.errorKey).toBe('todo.field.title.errors.empty');
            expect(updatedConfig.elements.title.hasError).toBe(true);

            expect(updatedConfig.elements.description.errorKey).toBeUndefined();
            expect(updatedConfig.elements.description.hasError).toBe(false);
        });

        it('should return a new instance', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: '',
                },
            });

            const updatedConfig = config.withErrors({ title: 'todo.field.title.errors.empty' });

            expect(updatedConfig).not.toBe(config);
        });

        it('should not modify the original configuration when updating errors', () =>
        {
            const config = new FormConfiguration({
                title: {
                    type: FormElementType.inputText,
                    value: '',
                },
            });

            const originalTitleErrorKey = config.elements.title.errorKey;
            const originalTitleHasError = config.elements.title.hasError;

            config.withErrors({ title: 'todo.field.title.errors.empty' });

            expect(config.elements.title.errorKey).toBe(originalTitleErrorKey);
            expect(config.elements.title.hasError).toBe(originalTitleHasError);
        });
    });
});
