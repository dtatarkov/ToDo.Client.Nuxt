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
            expect(button.state.value.title).toBe('');
        });

        it('should initialize with neutral color', () =>
        {
            expect(button.state.value.color).toBe('neutral');
        });

        it('should initialize with isLoading false', () =>
        {
            expect(button.state.value.isLoading).toBe(false);
        });

        it('should initialize with isDisabled false', () =>
        {
            expect(button.state.value.isDisabled).toBe(false);
        });
    });

    describe('properties', () =>
    {
        it('should read title from state', () =>
        {
            expect(button.state.value.title).toBe('');
            expect(button.title).toBe('');
        });

        it('should write title to state', () =>
        {
            button.title = 'Save';

            expect(button.state.value.title).toBe('Save');
            expect(button.title).toBe('Save');
        });

        it('should read color from state', () =>
        {
            expect(button.state.value.color).toBe('neutral');
            expect(button.color).toBe('neutral');
        });

        it('should write color to state', () =>
        {
            button.color = 'primary';

            expect(button.state.value.color).toBe('primary');
            expect(button.color).toBe('primary');
        });

        it('should read isLoading from state', () =>
        {
            expect(button.state.value.isLoading).toBe(false);
            expect(button.isLoading).toBe(false);
        });
    });

    describe('showLoader', () =>
    {
        it('should set isLoading to true', () =>
        {
            button.showLoader();

            expect(button.isLoading).toBe(true);
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

            expect(button.isLoading).toBe(false);
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

            expect(button.isLoading).toBe(true);

            resolve();
            await executionPromise;

            expect(button.isLoading).toBe(false);
        });
    });
});