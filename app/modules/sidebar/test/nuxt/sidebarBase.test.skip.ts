// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { SidebarBase } from '../../entities/sidebarBase';
// import { timelineMock } from '@/modules/uikit/mocks/timelineMock';

// describe('SidebarBase', () =>
// {
//     let sidebar: SidebarBase;

//     beforeEach(() =>
//     {
//         sidebar = new SidebarBase(timelineMock);
//     });

//     describe('layers', () =>
//     {
//         it('should create layers with notificationsTimeline key', () =>
//         {
//             const sidebar = new SidebarBase(timelineMock);

//             expect(sidebar.layers.timeline).toBeDefined();
//             expect(sidebar.layers.timeline.content).toBe(timelineMock);
//         });
//     });

//     describe('onLayersChange', () =>
//     {
//         it('should fire when a layer isActive changes', () =>
//         {
//             const callback = vi.fn();

//             sidebar.onLayersChange(callback);
//             sidebar.layers.timeline.isActive = true;

//             expect(callback).toHaveBeenCalledTimes(1);
//         });
//     });
// });