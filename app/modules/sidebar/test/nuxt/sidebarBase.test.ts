import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SidebarBase } from '../../entities/sidebarBase';
import { notificationsTimelineMock } from '@/modules/uikit/mocks/notificationsTimelineMock';

describe('SidebarBase', () =>
{
    let sidebar: SidebarBase;

    beforeEach(() =>
    {
        sidebar = new SidebarBase(notificationsTimelineMock);
    });

    describe('layers', () =>
    {
        it('should create layers with notificationsTimeline key', () =>
        {
            const sidebar = new SidebarBase(notificationsTimelineMock);

            expect(sidebar.layers.notificationsTimeline).toBeDefined();
            expect(sidebar.layers.notificationsTimeline.content).toBe(notificationsTimelineMock);
        });
    });

    describe('onLayersChange', () =>
    {
        it('should fire when a layer isActive changes', () =>
        {
            const callback = vi.fn();

            sidebar.onLayersChange(callback);
            sidebar.layers.notificationsTimeline.isActive = true;

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });
});