import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SidebarLayer } from '../../entities/sidebarLayer';
import { uiElementMock } from '@/modules/uikit/mocks/uiElementMock';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

describe('SidebarLayer', () =>
{
    let layer: SidebarLayer<UIElement>;

    beforeEach(() =>
    {
        layer = new SidebarLayer(uiElementMock);
    });

    describe('isActive', () =>
    {
        it('should be false by default', () =>
        {
            expect(layer.isActive).toBe(false);
        });
    });

    describe('onActiveStateChange', () =>
    {
        it('should emit when isActive changes to true', () =>
        {
            const callback = vi.fn();

            layer.onActiveStateChange(callback);
            layer.isActive = true;

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(true);
        });

        it('should emit when isActive changes to false', () =>
        {
            const callback = vi.fn();

            layer.isActive = true;
            layer.onActiveStateChange(callback);
            layer.isActive = false;

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(false);
        });

        it('should NOT emit when isActive set to same value', () =>
        {
            const callback = vi.fn();

            layer.onActiveStateChange(callback);
            layer.isActive = false;

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('vnode', () =>
    {
        it('should return uiElementMock.vnode', () =>
        {
            const layer = new SidebarLayer(uiElementMock);

            expect(layer.vnode).toBe(uiElementMock.vnode);
        });
    });

    describe('[Symbol.dispose]', () =>
    {
        it('should not dispose content on its own dispose', () =>
        {
            const layer = new SidebarLayer(uiElementMock);

            layer[Symbol.dispose]();

            expect(uiElementMock[Symbol.dispose]).not.toHaveBeenCalled();
        });
    });
});