import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ButtonGeneralViewmodelImpl } from '../../src/viewmodels/buttonGeneralViewmodelImpl';
import { AsyncCommandGeneric, DisposedException, getPromiseResolverAsync } from '@client/shared';

describe('ButtonGeneralViewmodelImpl', () =>
{
    let button: ButtonGeneralViewmodelImpl;

    beforeEach(() =>
    {
        button = new ButtonGeneralViewmodelImpl();
    });

    describe('state', () =>
    {
        it('should initialize with empty title', () =>
        {
            expect(button.state.value.title).toBeUndefined();
        });

        it('should initialize with neutral color', () =>
        {
            expect(button.state.value.color).toBe('neutral');
        });

        it('should initialize with isLoading false', () =>
        {
            expect(button.state.value.isLoading).toBe(false);
        });
    });

    describe('setTitle', () =>
    {
        it('should update title in state', () =>
        {
            button.setTitle('button.create');

            expect(button.state.value.title).toBe('button.create');
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.setTitle('button.create')).toThrow(DisposedException);
        });
    });

    describe('setColor', () =>
    {
        it('should update color in state', () =>
        {
            button.setColor('primary');

            expect(button.state.value.color).toBe('primary');
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.setColor('primary')).toThrow(DisposedException);
        });
    });

    describe('showLoader', () =>
    {
        it('should set isLoading to true', () =>
        {
            button.showLoader();

            expect(button.state.value.isLoading).toBe(true);
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.showLoader()).toThrow(DisposedException);
        });
    });

    describe('hideLoader', () =>
    {
        it('should set isLoading to false', () =>
        {
            button.showLoader();
            button.hideLoader();

            expect(button.state.value.isLoading).toBe(false);
        });

        it('should throw DisposedException when disposed', () =>
        {
            button[Symbol.dispose]();

            expect(() => button.hideLoader()).toThrow(DisposedException);
        });
    });

    describe('setCommand', () =>
    {
        it('should show loader when command is executing and hide it when completed', async () =>
        {
            const { resolve, promise } = await getPromiseResolverAsync();

            const executeFn = vi.fn(() => promise);
            const command = new AsyncCommandGeneric(executeFn);

            button.setCommand(command);

            const executionPromise = command.executeAsync();

            expect(button.state.value.isLoading).toBe(true);

            resolve();
            await executionPromise;

            expect(button.state.value.isLoading).toBe(false);
        });
    });
});