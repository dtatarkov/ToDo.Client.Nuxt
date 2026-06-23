import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastsStoreBase } from '../../entities/toastsStoreBase';
import { createToastMock, toastMock } from '../../mocks/toastMock';
import { awaitMicrotasks } from '@/modules/shared/utils/awaitMicrotasks';

describe('ToastsStoreBase', () =>
{
    let store: ToastsStoreBase;

    beforeEach(() =>
    {
        store = new ToastsStoreBase();
    });

    describe('add', () =>
    {
        it('should add toast without id to elements', () =>
        {
            store.add(toastMock);

            expect(store.getElements()).toContain(toastMock);
            expect(store.getElements().length).toBe(1);
        });

        it('should close existing toast when adding another with the same id', () =>
        {
            const existing = createToastMock({ id: 'sameId' });
            const newNotification = createToastMock({ id: 'sameId' });

            store.add(existing);
            store.add(newNotification);

            const elements = store.getElements();

            expect(existing.close).toHaveBeenCalledTimes(1);
            expect(newNotification.close).not.toHaveBeenCalled();
            expect(elements).toContain(newNotification);
        });

        it('should add multiple standalone toasts', () =>
        {
            const toastMock1 = createToastMock();
            const toastMock2 = createToastMock();

            store.add(toastMock1);
            store.add(toastMock2);

            expect(store.getElements().length).toBe(2);
            expect(store.getElements()).toContain(toastMock1);
            expect(store.getElements()).toContain(toastMock2);
        });

        it('should add multiple toasts with different ids', () =>
        {
            const toastMock1 = createToastMock({ id: 'group1' });
            const toastMock2 = createToastMock({ id: 'group2' });

            store.add(toastMock1);
            store.add(toastMock2);

            expect(store.getElements().length).toBe(2);
            expect(store.getElements()).toContain(toastMock1);
            expect(store.getElements()).toContain(toastMock2);
        });

        it('should close each existing toast when adding multiple with the same id', () =>
        {
            const firstToastMock = createToastMock({ id: 'group1' });
            const secondToastMock = createToastMock({ id: 'group1' });
            const thirdToastMock = createToastMock({ id: 'group1' });

            store.add(firstToastMock);
            store.add(secondToastMock);
            store.add(thirdToastMock);

            expect(firstToastMock.close).toHaveBeenCalledTimes(2);
            expect(secondToastMock.close).toHaveBeenCalledTimes(1);
            expect(thirdToastMock.close).not.toHaveBeenCalled();
            expect(store.getElements()).toContain(thirdToastMock);
        });
    });

    describe('remove', () =>
    {
        it('should remove standalone toast from elements', () =>
        {
            store.add(toastMock);
            store.remove(toastMock);

            expect(store.getElements()).not.toContain(toastMock);
            expect(store.getElements().length).toBe(0);
        });

        it('should remove toast with id from elements', () =>
        {
            const toastMock = createToastMock({ id: 'group1' });

            store.add(toastMock);
            store.remove(toastMock);

            expect(store.getElements()).not.toContain(toastMock);
            expect(store.getElements().length).toBe(0);
        });

        it('should allow adding toast with same id after previous one is removed', () =>
        {
            const toastMock1 = createToastMock({ id: 'group1' });
            const toastMock2 = createToastMock({ id: 'group1' });

            store.add(toastMock1);
            store.remove(toastMock1);
            store.add(toastMock2);

            expect(store.getElements()).toContain(toastMock2);
            expect(store.getElements().length).toBe(1);
            expect(toastMock1.close).not.toHaveBeenCalled();
        });

        it('should throw if element not present', () =>
        {
            expect(() => store.remove(toastMock)).toThrow();
        });
    });

    describe('getElements', () =>
    {
        it('should return empty array initially', () =>
        {
            expect(store.getElements()).toEqual([]);
        });
    });

    describe('onElementsChange', () =>
    {
        it('should not invoke callback immediately on add (deferred)', () =>
        {
            const callback = vi.fn();

            store.onElementsChange(callback);
            store.add(toastMock);

            expect(callback).not.toHaveBeenCalled();
        });

        it('should invoke callback after microtask on add', async () =>
        {
            const callback = vi.fn();

            store.onElementsChange(callback);
            store.add(toastMock);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([toastMock]);
        });

        it('should invoke callback after microtask on remove', async () =>
        {
            const callback = vi.fn();

            store.add(toastMock);
            store.onElementsChange(callback);
            store.remove(toastMock);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });

        it('should invoke callback after microtask when toast with same id is added', async () =>
        {
            const store = new ToastsStoreBase();
            const callback = vi.fn();
            const existing = createToastMock({ id: 'group1' });
            const newNotification = createToastMock({ id: 'group1' });

            store.add(existing);
            store.onElementsChange(callback);
            store.add(newNotification);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([existing, newNotification]);
        });

        it('should deliver only the last elements state when multiple adds happen before microtask', async () =>
        {
            const callback = vi.fn();
            const toastMock1 = createToastMock();
            const toastMock2 = createToastMock();

            store.onElementsChange(callback);
            store.add(toastMock1);
            store.add(toastMock2);

            await awaitMicrotasks();

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([toastMock1, toastMock2]);
        });
    });
});