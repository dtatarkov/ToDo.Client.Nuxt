import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModalsStoreBase } from '../../entities/modalsStoreBase';
import { createModalMock, modalMock } from '../../mocks/modalMock';

describe('ModalsStoreBase', () =>
{
    let store: ModalsStoreBase;

    beforeEach(() =>
    {
        store = new ModalsStoreBase();
    });

    describe('add', () =>
    {
        it('should add modal to elements', () =>
        {
            store.add(modalMock);

            expect(store.getElements()).toContain(modalMock);
            expect(store.getElements().length).toBe(1);
        });

        it('should throw if element already added', () =>
        {
            store.add(modalMock);
            expect(() => store.add(modalMock)).toThrow();
        });
    });

    describe('remove', () =>
    {
        it('should remove modal from elements', () =>
        {
            store.add(modalMock);
            store.remove(modalMock);

            expect(store.getElements()).not.toContain(modalMock);
            expect(store.getElements().length).toBe(0);
        });

        it('should throw if element not present', () =>
        {
            expect(() => store.remove(modalMock)).toThrow();
        });
    });

    describe('getElements', () =>
    {
        it('should return empty array initially', () =>
        {
            expect(store.getElements()).toEqual([]);
        });

        it('should return stored elements', () =>
        {
            const store = new ModalsStoreBase();
            const modal1 = createModalMock();
            const modal2 = createModalMock();

            store.add(modal1);
            store.add(modal2);

            const elements = store.getElements();
            expect(elements.length).toBe(2);
            expect(elements).toContain(modal1);
            expect(elements).toContain(modal2);
        });
    });

    describe('onElementsChange', () =>
    {
        it('should emit on add', () =>
        {
            const callback = vi.fn();
            store.onElementsChange(callback);
            store.add(modalMock);

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([modalMock]);
        });

        it('should emit on remove', () =>
        {
            const callback = vi.fn();

            store.add(modalMock);
            store.onElementsChange(callback);
            store.remove(modalMock);

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith([]);
        });
    });
});