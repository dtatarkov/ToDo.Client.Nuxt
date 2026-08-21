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
            expect(button.state.value.icon).toBeUndefined();
        });
    });

    describe('setIcon', () =>
    {
        it('should update icon in state', () =>
        {
            button.setIcon(Icon.check);

            expect(button.state.value.icon).toBe(Icon.check);
        });
    });
});