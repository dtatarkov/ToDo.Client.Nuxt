import { describe, it, expect, vi } from 'vitest';
import { ButtonGeneralBase } from '../../entities/buttons/buttonGeneralBase';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { DisposedException } from '@/modules/shared/exceptions/disposedException';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import { AsyncCommandBase } from '@/modules/shared/entities/asyncCommandBase';
import { delay } from '@/modules/shared/utils/delay';

describe('ButtonGeneralBase', () =>
{
    describe('title', () =>
    {
        it('should be empty string by default', () =>
        {
            const button = new ButtonGeneralBase();
            expect(button.title).toBe('');
        });
    });

    describe('color', () =>
    {
        it('should be neutral by default', () =>
        {
            const button = new ButtonGeneralBase();
            expect(button.color).toBe('neutral');
        });
    });

    describe('isDisabled', () =>
    {
        it('should be false by default', () =>
        {
            const button = new ButtonGeneralBase();
            expect(button.isDisabled).toBe(false);
        });
    });

    describe('isLoading', () =>
    {
        it('should be false by default', () =>
        {
            const button = new ButtonGeneralBase();
            expect(button.isLoading).toBe(false);
        });
    });

    describe('disable', () =>
    {
        it('should set isDisabled to true', () =>
        {
            const button = new ButtonGeneralBase();
            button.disable();
            expect(button.isDisabled).toBe(true);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonGeneralBase();
            button[Symbol.dispose]();
            expect(() => button.disable()).toThrow(DisposedException);
        });
    });

    describe('enable', () =>
    {
        it('should set isDisabled to false', () =>
        {
            const button = new ButtonGeneralBase();

            button.disable();
            expect(button.isDisabled).toBe(true);

            button.enable();
            expect(button.isDisabled).toBe(false);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonGeneralBase();
            button[Symbol.dispose]();
            expect(() => button.enable()).toThrow(DisposedException);
        });
    });

    describe('showLoader', () =>
    {
        it('should set isLoading to true', () =>
        {
            const button = new ButtonGeneralBase();
            button.showLoader();
            expect(button.isLoading).toBe(true);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonGeneralBase();
            button[Symbol.dispose]();
            expect(() => button.showLoader()).toThrow(DisposedException);
        });
    });

    describe('hideLoader', () =>
    {
        it('should set isLoading to false', () =>
        {
            const button = new ButtonGeneralBase();

            button.showLoader();
            expect(button.isLoading).toBe(true);

            button.hideLoader();
            expect(button.isLoading).toBe(false);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonGeneralBase();
            button[Symbol.dispose]();
            expect(() => button.hideLoader()).toThrow(DisposedException);
        });
    });

    describe('getCommand', () =>
    {
        it('should return undefined when no command is set', () =>
        {
            const button = new ButtonGeneralBase();

            expect(button.getCommand()).toBeUndefined();
        });

        it('should return the command after setCommand', () =>
        {
            const button = new ButtonGeneralBase();
            const command = new AsyncCommandBase(async () => true);

            button.setCommand(command);

            expect(button.getCommand()).toBe(command);
        });
    });

    describe('setCommand', () =>
    {
        it('should register onIdle handler that hides loader', async () =>
        {
            const button = new ButtonGeneralBase();
            const command = new AsyncCommandBase(async () => true);

            button.showLoader();
            button.setCommand(command);

            await command.executeAsync();

            expect(button.isLoading).toBe(false);
        });

        it('should register onExecuting handler that shows loader', async () =>
        {
            const button = new ButtonGeneralBase();
            const command = new AsyncCommandBase(async () => delay(10000));

            button.setCommand(command);
            command.executeAsync();

            expect(button.isLoading).toBe(true);
        });

        it('should throw InitializationOnlyException when called twice', () =>
        {
            const button = new ButtonGeneralBase();
            const command1 = new AsyncCommandBase(async () => true);
            const command2 = new AsyncCommandBase(async () => true);

            button.setCommand(command1);

            expect(() => button.setCommand(command2)).toThrow(InitializationOnlyException);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonGeneralBase();
            const command = new AsyncCommandBase(async () => true);

            button[Symbol.dispose]();

            expect(() => button.setCommand(command)).toThrow(DisposedException);
        });
    });

    describe('onClick', () =>
    {
        it('should register and invoke click handler', () =>
        {
            const button = new ButtonGeneralBase();
            const handler = vi.fn();
            const disposeToken = new DisposeToken();

            button.onClick(handler, disposeToken);
            button.click();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should throw DisposedException when registered after dispose', () =>
        {
            const button = new ButtonGeneralBase();
            const disposeToken = new DisposeToken();

            button[Symbol.dispose]();

            expect(() => button.onClick(() => { }, disposeToken)).toThrow(DisposedException);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should not throw when disposed multiple times', () =>
        {
            const button = new ButtonGeneralBase();

            button[Symbol.dispose]();

            expect(() => button[Symbol.dispose]()).not.toThrow();
        });
    });
});