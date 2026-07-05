import { describe, it, expect, vi } from 'vitest';
import { ButtonIconBase } from '../../entities/buttons/buttonIconBase';
import { DisposedException, InitializationOnlyException , AsyncCommandBase , Icon  } from '@packages/shared';




describe('ButtonIconBase', () =>
{
    describe('icon', () =>
    {
        it('should have default icon', () =>
        {
            const button = new ButtonIconBase();
            expect(button.icon).toBe(Icon.questionMarkCircle);
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

    describe('getCommand', () =>
    {
        it('should return undefined when no command is set', () =>
        {
            const button = new ButtonIconBase();

            expect(button.getCommand()).toBeUndefined();
        });

        it('should return the command after setCommand', () =>
        {
            const button = new ButtonIconBase();
            const command = new AsyncCommandBase(async () => true);

            button.setCommand(command);

            expect(button.getCommand()).toBe(command);
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

            button.onClick(handler);
            button.click();

            expect(handler).toHaveBeenCalledOnce();
        });

        it('should throw DisposedException when registered after dispose', () =>
        {
            const button = new ButtonIconBase();
            button[Symbol.dispose]();

            expect(() => button.onClick(() => { })).toThrow(DisposedException);
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