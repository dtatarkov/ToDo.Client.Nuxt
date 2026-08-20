import { describe, it, expect, beforeEach } from 'vitest';
import { ButtonIconViewmodelImpl } from '../../src/viewmodels/buttonIconViewmodelImpl';
import { Icon } from '@client/shared';

describe('ButtonIconViewmodelImpl', () =>
{
    let button: ButtonIconViewmodelImpl;

    beforeEach(() =>
    {
        button = new ButtonIconViewmodelImpl();
    });

    describe('state', () =>
    {
        it('should initialize with default icon', () =>
        {
            expect(button.state.value.icon).toBe(Icon.questionMarkCircle);
        });

        it('should initialize with isDisabled false', () =>
        {
            expect(button.state.value.isDisabled).toBe(false);
        });
    });

    describe('properties', () =>
    {
        it('should read icon from state by default', () =>
        {
            expect(button.state.value.icon).toBe(Icon.questionMarkCircle);
            expect(button.icon).toBe(Icon.questionMarkCircle);
        });

        it('should write icon to state', () =>
        {
            button.icon = Icon.check;

            expect(button.state.value.icon).toBe(Icon.check);
            expect(button.icon).toBe(Icon.check);
        });
    });
});