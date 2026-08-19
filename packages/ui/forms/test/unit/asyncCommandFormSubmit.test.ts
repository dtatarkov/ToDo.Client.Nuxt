import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AsyncCommandFormSubmit } from '../../src/commands/asyncCommandFormSubmit';
import { ValidationMessage } from '@client/infrastructure-validation';
import { formDataContextMock } from '../mocks/formDataContextMock';
import { formLockMock } from '../mocks/formLockMock';
import { formValidatorMock } from '../mocks/formValidatorMock';
import { formEventsMock } from '../mocks/formEventsMock';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';

beforeEach(() =>
{
    vi.resetAllMocks();
});

function createCommand(submitHandler?: ReturnType<typeof vi.fn>): AsyncCommandFormSubmit
{
    return new AsyncCommandFormSubmit(
        formDataContextMock,
        formLockMock,
        formValidatorMock,
        formEventsMock,
        submitHandler ?? vi.fn(async () => { }),
    );
}

describe('executeAsync', () =>
{
    it('calls submit handler with form data when validation succeeds', async () =>
    {
        const data = { title: 'Test' };
        formDataContextMock.getData.mockReturnValue(data);
        formValidatorMock.markAsValid();

        const submitHandler = vi.fn(async () => { });
        const command = createCommand(submitHandler);

        await command.executeAsync();

        expect(submitHandler).toHaveBeenCalledWith(data);
    });

    it('locks form when validation succeeds', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();

        const command = createCommand();

        await command.executeAsync();

        expect(formLockMock.disable).toHaveBeenCalledTimes(1);
    });

    it('unlocks form when submit handler succeeds', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();

        const command = createCommand();

        await command.executeAsync();

        expect(formLockMock.enable).toHaveBeenCalledTimes(1);
    });

    it('unlocks form when submit handler fails', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();

        const submitHandler = vi.fn(async () => { throw new Error('fail'); });
        const command = createCommand(submitHandler);

        await expect(command.executeAsync()).rejects.toThrow();

        expect(formLockMock.enable).toHaveBeenCalledTimes(1);
    });

    it('returns true when submit handler succeeds', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();

        const command = createCommand();

        const result = await command.executeAsync();

        expect(result).toBe(true);
    });

    it('throws error when submit handler fails', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();

        const error = new Error('submit failed');
        const submitHandler = vi.fn(async () => { throw error; });
        const command = createCommand(submitHandler);

        await expect(command.executeAsync()).rejects.toThrow(error);
    });

    it('returns false when validation fails', async () =>
    {
        const messages = { title: [new ValidationMessage('entity.field.required')] };
        formDataContextMock.getData.mockReturnValue({ title: '' });
        formValidatorMock.markAsInvalid(messages);

        const command = createCommand();

        const result = await command.executeAsync();

        expect(result).toBe(false);
    });

    it('emits validation error when validation fails', async () =>
    {
        const messages = { title: [new ValidationMessage('entity.field.required')] };
        formDataContextMock.getData.mockReturnValue({ title: '' });
        formValidatorMock.markAsInvalid(messages);

        const command = createCommand();

        await command.executeAsync();

        expect(formEventsMock.formValidationErrorEvent.emit).toHaveBeenCalledWith(messages);
    });

    it('throws FormDisabledException when form is disabled', async () =>
    {
        formDataContextMock.getData.mockReturnValue({ title: 'Test' });
        formValidatorMock.markAsValid();
        formLockMock.markDisabled();

        const command = createCommand();

        await expect(command.executeAsync()).rejects.toThrow(FormDisabledException);
    });
});

describe('dispose', () =>
{
    it('does not throw when disposed multiple times', () =>
    {
        const command = createCommand();

        command[Symbol.dispose]();

        expect(() => command[Symbol.dispose]()).not.toThrow();
    });
});
