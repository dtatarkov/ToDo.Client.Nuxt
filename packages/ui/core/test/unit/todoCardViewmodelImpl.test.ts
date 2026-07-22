import { describe, it, expect, beforeEach, vi } from 'vitest';
import { dateFormatterMock } from '@client/infrastructure-datetime/mocks';
import type { ToDoCardViewmodelData } from '../../src/viewmodels/todoCardViewmodel';
import { infoBlockViewmodelMock } from '../mocks/infoBlockViewmodelMock';
import { ToDoCardViewmodelImpl } from '../../src/viewmodels/todoCardViewmodelImpl';
import type { InfoBlockViewmodelState } from '../../src/viewmodels/infoBlockViewmodel';

describe('ToDoCardViewmodelImpl', () =>
{
    let viewmodel: ToDoCardViewmodelImpl;

    beforeEach(() =>
    {
        vi.resetAllMocks();

        infoBlockViewmodelMock.state.setMockValue({
            rows: [],
            hasRows: false,
        });

        viewmodel = new ToDoCardViewmodelImpl(dateFormatterMock, infoBlockViewmodelMock);
    });

    describe('constructor', () =>
    {
        it('should initialize state', () =>
        {
            expect(viewmodel.state.value).toEqual({
                infoBlock: { rows: [], hasRows: false },
                hasFooter: false,
            });
        });
    });

    describe('setData', () =>
    {
        it('should clear infoBlock and not add rows when no dates are present', () =>
        {
            const data: ToDoCardViewmodelData = {};

            viewmodel.setData(data);

            expect(viewmodel.state.value.infoBlock.rows).toHaveLength(0);
            expect(viewmodel.state.value.infoBlock.hasRows).toBe(false);
            expect(viewmodel.state.value.hasFooter).toBe(false);
        });

        it('should add actual completion date row when completionDateActual is present', () =>
        {
            const mockDate = new Date('2025-01-15');
            const formattedDate = '15.01.2025';

            const data: ToDoCardViewmodelData = {
                completionDateActual: mockDate
            };

            const infoBlockState: InfoBlockViewmodelState = {
                rows: [
                    { labelKey: 'todo.card.completed', content: formattedDate }
                ],

                hasRows: true,
            };

            dateFormatterMock.formatDateOptional.mockReturnValue(formattedDate);
            infoBlockViewmodelMock.state.setMockValue(infoBlockState);

            viewmodel.setData(data);

            expect(dateFormatterMock.formatDateOptional).toHaveBeenCalledWith(mockDate);
            expect(infoBlockViewmodelMock.addRow).toBeCalledTimes(1);
            expect(infoBlockViewmodelMock.addRow).toBeCalledWith(infoBlockState.rows[0]?.labelKey, infoBlockState.rows[0]?.content);
            expect(viewmodel.state.value.infoBlock).toEqual(infoBlockState);
            expect(viewmodel.state.value.hasFooter).toBe(true);
        });

        it('should add planned completion date row when completionDatePlanned is present', () =>
        {
            const mockDate = new Date('2025-02-20');
            const formattedDate = '20.02.2025';

            const data: ToDoCardViewmodelData = {
                completionDatePlanned: mockDate
            };

            const infoBlockState: InfoBlockViewmodelState = {
                rows: [
                    { labelKey: 'todo.card.completeBy', content: formattedDate }
                ],

                hasRows: true,
            };

            dateFormatterMock.formatDateOptional.mockReturnValue(formattedDate);
            infoBlockViewmodelMock.state.setMockValue(infoBlockState);

            viewmodel.setData(data);

            expect(dateFormatterMock.formatDateOptional).toHaveBeenCalledWith(mockDate);
            expect(infoBlockViewmodelMock.addRow).toBeCalledTimes(1);
            expect(infoBlockViewmodelMock.addRow).toBeCalledWith(infoBlockState.rows[0]?.labelKey, infoBlockState.rows[0]?.content);
            expect(viewmodel.state.value.infoBlock).toEqual(infoBlockState);
            expect(viewmodel.state.value.hasFooter).toBe(true);
        });

        it('should add both dates when both are present', () =>
        {
            const mockDate1 = new Date('2025-01-15');
            const mockDate2 = new Date('2025-02-20');

            const formattedDate = 'date';

            const data: ToDoCardViewmodelData = {
                completionDateActual: mockDate1,
                completionDatePlanned: mockDate2,
            };

            const infoBlockState: InfoBlockViewmodelState = {
                rows: [
                    { labelKey: 'todo.card.completeBy', content: formattedDate },
                    { labelKey: 'todo.card.completed', content: formattedDate },
                ],

                hasRows: true,
            };

            dateFormatterMock.formatDateOptional.mockReturnValue('date');
            infoBlockViewmodelMock.state.setMockValue(infoBlockState);

            viewmodel.setData(data);

            expect(infoBlockViewmodelMock.addRow).toBeCalledTimes(2);
            expect(infoBlockViewmodelMock.addRow).toBeCalledWith(infoBlockState.rows[0]?.labelKey, infoBlockState.rows[0]?.content);
            expect(infoBlockViewmodelMock.addRow).toBeCalledWith(infoBlockState.rows[1]?.labelKey, infoBlockState.rows[1]?.content);
            expect(viewmodel.state.value.infoBlock).toEqual(infoBlockState);
            expect(viewmodel.state.value.hasFooter).toBe(true);
        });

        it('should clear previous rows before adding new ones', () =>
        {
            const mockDate1 = new Date('2025-01-15');
            dateFormatterMock.formatDateOptional.mockReturnValue('date1');

            const data1: ToDoCardViewmodelData = { completionDateActual: mockDate1 };
            viewmodel.setData(data1);

            expect(infoBlockViewmodelMock.clear).toBeCalledTimes(1);
            expect(infoBlockViewmodelMock.addRow).toBeCalledTimes(1);

            const mockDate2 = new Date('2025-02-20');
            dateFormatterMock.formatDateOptional.mockReturnValue('date2');

            const data2: ToDoCardViewmodelData = { completionDatePlanned: mockDate2 };
            viewmodel.setData(data2);

            expect(infoBlockViewmodelMock.clear).toBeCalledTimes(2);
            expect(infoBlockViewmodelMock.addRow).toBeCalledTimes(2);
        });
    });

    describe('hasFooter', () =>
    {
        it('should return false when infoBlock has no rows', () =>
        {
            expect(viewmodel.state.value.hasFooter).toBe(false);
        });

        it('should return true when infoBlock has rows', () =>
        {
            infoBlockViewmodelMock.state.setMockValue({
                rows: [
                    { labelKey: 'todo.card.completeBy', content: '' },
                ],
                hasRows: true,
            });

            viewmodel.setData({
                completionDatePlanned: new Date()
            });

            expect(viewmodel.state.value.hasFooter).toBe(true);
        });
    });
});
