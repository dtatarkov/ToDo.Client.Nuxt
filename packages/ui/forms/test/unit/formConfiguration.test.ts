import { describe, it, expect } from 'vitest';
import { FormConfiguration } from '../../src/configuration/formConfiguration';
import { InputType } from '@client/ui-uikit';

describe('toData', () =>
{
    it('should construct elements without options', () =>
    {
        const config = new FormConfiguration({
            title: {
                inputType: InputType.inputText,
                value: 'default-title',
                labelKey: 'todo.field.title.label',
            },
            description: {
                inputType: InputType.inputTextarea,
                value: 'default-desc',
                labelKey: 'todo.field.description.label',
            },
            createDate: {
                inputType: InputType.inputDateTime,
            },
        });

        const result = config.toData();

        const elements = result.elements!;
        expect(elements).toHaveLength(3);
        expect(elements[0].name).toBe('title');
        expect(elements[0].value).toBe('default-title');
        expect(elements[0].labelKey).toBe('todo.field.title.label');
        expect(elements[0].inputType).toBe(InputType.inputText);
        expect(elements[0].hasError).toBe(false);
        expect(elements[0].errorKey).toBeUndefined();

        expect(elements[1].name).toBe('description');
        expect(elements[1].value).toBe('default-desc');
        expect(elements[1].labelKey).toBe('todo.field.description.label');
        expect(elements[1].inputType).toBe(InputType.inputTextarea);
        expect(elements[1].hasError).toBe(false);
        expect(elements[1].errorKey).toBeUndefined();

        expect(elements[2].name).toBe('createDate');
        expect(elements[2].value).toBeUndefined();
        expect(elements[2].inputType).toBe(InputType.inputDateTime);
        expect(elements[2].hasError).toBe(false);
        expect(elements[2].errorKey).toBeUndefined();
    });

    it('should construct elements with overridden values', () =>
    {
        const config = new FormConfiguration({
            title: {
                inputType: InputType.inputText,
                value: 'default-title',
                labelKey: 'todo.field.title.label',
            },
            description: {
                inputType: InputType.inputTextarea,
                value: 'default-desc',
                labelKey: 'todo.field.description.label',
            },
            createDate: {
                inputType: InputType.inputDateTime,
            },
        });

        const result = config.toData({
            values: {
                title: 'new-title',
                createDate: new Date('2024-01-15T10:30:00'),
            },
        });

        const elements = result.elements!;

        expect(elements[0].name).toBe('title');
        expect(elements[0].value).toBe('new-title');

        expect(elements[1].name).toBe('description');
        expect(elements[1].value).toBe('default-desc');

        expect(elements[2].name).toBe('createDate');
        expect(elements[2].value).toEqual(new Date('2024-01-15T10:30:00'));
    });

    it('should construct elements with errors', () =>
    {
        const config = new FormConfiguration({
            title: {
                inputType: InputType.inputText,
                value: 'default-title',
            },
            description: {
                inputType: InputType.inputTextarea,
                value: 'default-desc',
            },
            createDate: {
                inputType: InputType.inputDateTime,
            },
        });

        const result = config.toData({
            errors: {
                title: 'todo.field.title.errors.empty',
                description: 'entity.field.required',
            },
        });

        const elements = result.elements!;

        expect(elements[0].name).toBe('title');
        expect(elements[0].hasError).toBe(true);
        expect(elements[0].errorKey).toBe('todo.field.title.errors.empty');

        expect(elements[1].name).toBe('description');
        expect(elements[1].hasError).toBe(true);
        expect(elements[1].errorKey).toBe('entity.field.required');

        expect(elements[2].name).toBe('createDate');
        expect(elements[2].hasError).toBe(false);
        expect(elements[2].errorKey).toBeUndefined();
    });

    it('should construct elements with all options provided', () =>
    {
        const config = new FormConfiguration({
            title: {
                inputType: InputType.inputText,
                value: 'default-title',
                labelKey: 'todo.field.title.label',
            },
            description: {
                inputType: InputType.inputTextarea,
                value: 'default-desc',
                labelKey: 'todo.field.description.label',
            },
            createDate: {
                inputType: InputType.inputDateTime,
            },
        });

        const result = config.toData({
            values: {
                title: 'override-title',
                createDate: new Date('2024-02-20T14:00:00'),
            },
            errors: {
                title: 'todo.field.title.errors.empty',
                description: 'entity.field.required',
            },
        });

        const elements = result.elements!;

        expect(elements[0].name).toBe('title');
        expect(elements[0].value).toBe('override-title');
        expect(elements[0].hasError).toBe(true);
        expect(elements[0].errorKey).toBe('todo.field.title.errors.empty');

        expect(elements[1].name).toBe('description');
        expect(elements[1].value).toBe('default-desc');
        expect(elements[1].hasError).toBe(true);
        expect(elements[1].errorKey).toBe('entity.field.required');

        expect(elements[2].name).toBe('createDate');
        expect(elements[2].value).toEqual(new Date('2024-02-20T14:00:00'));
        expect(elements[2].hasError).toBe(false);
        expect(elements[2].errorKey).toBeUndefined();
    });
});
