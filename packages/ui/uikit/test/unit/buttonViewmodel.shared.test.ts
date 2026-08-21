import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ButtonGeneralViewmodelImpl } from '../../src/viewmodels/buttonGeneralViewmodelImpl';
import { ButtonIconViewmodelImpl } from '../../src/viewmodels/buttonIconViewmodelImpl';
import { AsyncCommandGeneric, DisposedException, InitializationOnlyException } from '@client/shared';
import type { Constructor } from '@client/shared';
import type { ButtonBaseViewmodel } from '../../src/viewmodels/buttonBaseViewmodel';

interface TestParams
{
    label: string;
    ViewmodelClass: Constructor<ButtonBaseViewmodel<any>>;
}

const testCases: TestParams[] = [
    {
        label: 'ButtonGeneralViewmodelImpl',
        ViewmodelClass: ButtonGeneralViewmodelImpl,
    },

    {
        label: 'ButtonIconViewmodelImpl',
        ViewmodelClass: ButtonIconViewmodelImpl,
    }
];

describe.each(testCases)('$label', ({ ViewmodelClass }) =>
{
    let button: ButtonBaseViewmodel<any>;

    beforeEach(() =>
    {
        button = new ViewmodelClass();
    });

    describe('state', () =>
    {
        it('should initialize with isDisabled false', () =>
        {
            expect(button.state.value.isDisabled).toBe(false);
        });
    });

    describe('disable', () =>
    {
        it('should disable the button', () =>
        {
            button.disable();

            expect(button.state.value.isDisabled).toBe(true);
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.disable()).toThrow(DisposedException);
        });
    });

    describe('enable', () =>
    {
        it('should enable the button', () =>
        {
            button.disable();
            button.enable();

            expect(button.state.value.isDisabled).toBe(false);
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.enable()).toThrow(DisposedException);
        });
    });

    describe('getCommand', () =>
    {
        it('should return undefined when no command is set', () =>
        {
            expect(button.getCommand()).toBeUndefined();
        });

        it('should return the command after setCommand', () =>
        {
            const command = new AsyncCommandGeneric(async () => true);

            button.setCommand(command);

            expect(button.getCommand()).toBe(command);
        });
    });

    describe('setCommand', () =>
    {
        it('should set the command without error', () =>
        {
            const command = new AsyncCommandGeneric(async () => true);

            expect(() => button.setCommand(command)).not.toThrow();
        });

        it('should throw InitializationOnlyException when called twice', () =>
        {
            const command1 = new AsyncCommandGeneric(async () => true);
            const command2 = new AsyncCommandGeneric(async () => true);

            button.setCommand(command1);

            expect(() => button.setCommand(command2)).toThrow(InitializationOnlyException);
        });

        it('should throw DisposedException when disposed', () =>
        {
            const command = new AsyncCommandGeneric(async () => true);

            button[Symbol.dispose]();

            expect(() => button.setCommand(command)).toThrow(DisposedException);
        });
    });

    describe('click', () =>
    {
        it('should invoke all registered onClick handlers', () =>
        {
            const handler1 = vi.fn();
            const handler2 = vi.fn();

            button.onClick(handler1);
            button.onClick(handler2);
            button.click();

            expect(handler1).toHaveBeenCalledOnce();
            expect(handler2).toHaveBeenCalledOnce();
        });

        it('should execute provided command', async () =>
        {
            const executeFn = vi.fn(async () => true);

            button.setCommand(new AsyncCommandGeneric(executeFn));
            button.click();

            await vi.waitFor(() => expect(executeFn).toHaveBeenCalledOnce());
        });
    });

    describe('onClick', () =>
    {
        it('should register handler without error', () =>
        {
            expect(() => button.onClick(() => { })).not.toThrow();
        });

        it('should throw DisposedException when registered after dispose', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.onClick(() => { })).toThrow(DisposedException);
        });
    });

    describe('dispose', () =>
    {
        it('should not throw when disposed multiple times', () =>
        {
            button[Symbol.dispose]();

            expect(() => button[Symbol.dispose]()).not.toThrow();
        });
    });
});