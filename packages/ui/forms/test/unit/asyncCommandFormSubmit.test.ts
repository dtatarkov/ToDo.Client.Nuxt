import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AsyncCommandFormSubmit } from '../../src/commands/asyncCommandFormSubmit';
import { FormValidationError } from '../../src/entities/formValidationError';
import { FormElementValidationError } from '../../src/entities/formElementValidationError';
import { formDataContextMock } from '../mocks/formDataContextMock';
import { formLockMock, markFormLockMockAsDisabled } from '../mocks/formLockMock';
import { formValidatorMock, markFormValidatorInvalid, markFormValidatorValid } from '../mocks/formValidatorMock';
import { formEventsMock } from '../mocks/formEventsMock';
import { setupPausedHandlerAsync } from '@client/shared/mocks';
import { FormDisabledException } from '../../src/exceptions/formDisabledException';

describe('AsyncCommandFormSubmit', () =>
{
    beforeEach(() =>
    {
        vi.resetAllMocks();
    });

    describe('executeAsync', () =>
    {
        it('should submit data, lock/unlock form, and return true when handler succeeds', async () =>
        {
            const data = { title: 'Test' };
            formDataContextMock.getData.mockReturnValue(data);
            markFormValidatorValid();

            const submitHandler = vi.fn(async () => { });

            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                submitHandler
            );

            const logs: string[] = [];
            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(true);
            expect(logs).toEqual(['executing', 'executed', 'idle']);
            expect(formValidatorMock.validate).toHaveBeenCalledTimes(1);
            expect(formLockMock.disable).toHaveBeenCalledTimes(1);
            expect(submitHandler).toHaveBeenCalledWith(data);
            expect(formLockMock.enable).toHaveBeenCalledTimes(1);
            expect(formEventsMock.formValidationErrorEvent.emit).not.toHaveBeenCalled();
        });

        it('should return false and skip submission when validation fails', async () =>
        {
            const error = new FormValidationError([
                new FormElementValidationError('title', 'Title', 'Required'),
            ]);

            formDataContextMock.getData.mockReturnValue({ title: '' });
            markFormValidatorInvalid(error);

            const submitHandler = vi.fn(async () => { /* should not be called */ });

            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                submitHandler
            );

            const logs: string[] = [];
            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(logs).toEqual(['executing', 'idle']);
            expect(formValidatorMock.validate).toHaveBeenCalledTimes(1);
            expect(submitHandler).not.toHaveBeenCalled();
            expect(formLockMock.disable).not.toHaveBeenCalled();
            expect(formLockMock.enable).not.toHaveBeenCalled();
            expect(formEventsMock.formValidationErrorEvent.emit).toHaveBeenCalledWith(error);
        });

        it('should reject when submit handler throws and still unlock form', async () =>
        {
            const error = new Error('submit failed');
            formDataContextMock.getData.mockReturnValue({ title: 'Test' });
            markFormValidatorValid();

            const submitHandler = vi.fn(async () => { throw error; });

            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                submitHandler
            );

            const logs: string[] = [];
            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            await expect(command.executeAsync()).rejects.toThrow(error);
            expect(logs).toEqual(['executing', 'idle']);
            expect(formValidatorMock.validate).toHaveBeenCalledTimes(1);
            expect(formLockMock.disable).toHaveBeenCalledTimes(1);
            expect(submitHandler).toHaveBeenCalledTimes(1);
            expect(formLockMock.enable).toHaveBeenCalledTimes(1);
        });

        it('should return false and skip execution when already executing', async () =>
        {
            formDataContextMock.getData.mockReturnValue({ title: 'Test' });
            markFormValidatorValid();

            const submitHandler = vi.fn();
            setupPausedHandlerAsync(submitHandler);

            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                submitHandler
            );

            command.executeAsync();

            formValidatorMock.validate.mockReset();
            submitHandler.mockReset();

            const result = await command.executeAsync();

            expect(result).toBe(false);
            expect(formValidatorMock.validate).not.toHaveBeenCalled();
            expect(submitHandler).not.toHaveBeenCalled();
        });

        it('should return false and skip submission when form is disabled', async () =>
        {
            formDataContextMock.getData.mockReturnValue({ title: 'Test' });
            markFormValidatorValid();

            const submitHandler = vi.fn(async () => { /* should not be called */ });

            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                submitHandler
            );

            const logs: string[] = [];
            command.onExecuting(() => logs.push('executing'));
            command.onExecuted(() => logs.push('executed'));
            command.onIdle(() => logs.push('idle'));

            markFormLockMockAsDisabled();

            expect(() => command.executeAsync()).rejects.toThrow(FormDisabledException);
        });
    });

    describe('dispose', () =>
    {
        it('should not throw when disposed multiple times', () =>
        {
            const command = new AsyncCommandFormSubmit(
                formDataContextMock,
                formLockMock,
                formValidatorMock,
                formEventsMock,
                async () => { }
            );

            command[Symbol.dispose]();
            expect(() => command[Symbol.dispose]()).not.toThrow();
        });
    });
});
