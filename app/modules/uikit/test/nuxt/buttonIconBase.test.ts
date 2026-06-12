import { describe, it, expect, vi } from 'vitest';
import { ButtonIconBase } from '../../entities/buttons/buttonIconBase';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import { DisposedException } from '@/modules/shared/exceptions/disposedException';
import { InitializationOnlyException } from '@/modules/shared/exceptions/initializationOnlyException';
import { AsyncCommandBase } from '@/modules/shared/entities/asyncCommandBase';

describe('ButtonIconBase', () =>
{
    describe('icon', () =>
    {
        it('should be empty string by default', () =>
        {
            const button = new ButtonIconBase();
            expect(button.icon).toBe('');
        });
    });

    describe('isDisabled', () =>
    {
        it('should be false by default', () =>
        {
            const button = new ButtonIconBase();
            expect(button.isDisabled).toBe(false);
        });
    });

    describe('disable', () =>
    {
        it('should set isDisabled to true', () =>
        {
            const button = new ButtonIconBase();
            button.disable();
            expect(button.isDisabled).toBe(true);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonIconBase();
            button[Symbol.dispose]();
            expect(() => button.disable()).toThrow(DisposedException);
        });
    });

    describe('enable', () =>
    {
        it('should set isDisabled to false', () =>
        {
            const button = new ButtonIconBase();

            button.disable();
            expect(button.isDisabled).toBe(true);

            button.enable();
            expect(button.isDisabled).toBe(false);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonIconBase();
            button[Symbol.dispose]();
            expect(() => button.enable()).toThrow(DisposedException);
        });
    });

    describe('setCommand', () =>
    {
        it('should set the command without error', () =>
        {
            const button = new ButtonIconBase();
            const command = new AsyncCommandBase(async () => true);

            expect(() => button.setCommand(command)).not.toThrow();
        });

        it('should throw InitializationOnlyException when called twice', () =>
        {
            const button = new ButtonIconBase();
            const command1 = new AsyncCommandBase(async () => true);
            const command2 = new AsyncCommandBase(async () => true);

            button.setCommand(command1);

            expect(() => button.setCommand(command2)).toThrow(InitializationOnlyException);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const button = new ButtonIconBase();
            const command = new AsyncCommandBase(async () => true);

            button[Symbol.dispose]();

            expect(() => button.setCommand(command)).toThrow(DisposedException);
        });
    });

    describe('onClick', () =>
    {
        it('should register and invoke click handler', () =>
        {
            const button = new ButtonIconBase();
            const handler = vi.fn();
            const disposeToken = new DisposeToken();

            button.onClick(handler, disposeToken);
            button.click();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should throw DisposedException when registered after dispose', () =>
        {
            const button = new ButtonIconBase();
            const disposeToken = new DisposeToken();

            button[Symbol.dispose]();

            expect(() => button.onClick(() => { }, disposeToken)).toThrow(DisposedException);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should not throw when disposed multiple times', () =>
        {
            const button = new ButtonIconBase();

            button[Symbol.dispose]();

            expect(() => button[Symbol.dispose]()).not.toThrow();
        });
    });
});