import { describe, it, expect } from 'vitest';
import { TasksQueue } from '../../src/entities/tasksQueue';
import { DisposedException } from '../../src/exceptions/disposedException';

function setupInstance(): TasksQueue
{
    return new TasksQueue();
}

describe('queueTask', () =>
{
    it('should execute tasks in order', async () =>
    {
        const queue = setupInstance();
        const order: number[] = [];

        queue.queueTask(async () =>
        {
            order.push(1);
        });

        queue.queueTask(async () =>
        {
            order.push(2);
        });

        await queue.awaitAll();

        expect(order).toEqual([1, 2]);
    });

    it('should return the task result', async () =>
    {
        const queue = setupInstance();
        const result = await queue.queueTask(async () => 42);

        expect(result).toBe(42);
    });

    it('should skip task after disposal', async () =>
    {
        const queue = setupInstance();
        queue[Symbol.dispose]();

        expect(() =>
            queue.queueTask(async () => { })
        ).toThrow(DisposedException);
    });
});

describe('awaitAll', () =>
{
    it('should resolve when queue is empty', async () =>
    {
        const queue = setupInstance();
        await expect(queue.awaitAll()).resolves.toBeUndefined();
    });

    it('should wait for all queued tasks', async () =>
    {
        const queue = setupInstance();
        const executedTasks: string[] = [];

        queue.queueTask(async () =>
        {
            executedTasks.push('task1');
        });

        queue.queueTask(async () =>
        {
            executedTasks.push('task2');
        });

        await queue.awaitAll();

        expect(executedTasks).toEqual(['task1', 'task2']);
    });

    it('should continue after a task rejects', async () =>
    {
        const queue = setupInstance();
        const executedTasks: string[] = [];

        queue.queueTask(async () =>
        {
            throw new Error('fail');
        });

        queue.queueTask(async () =>
        {
            executedTasks.push('task2');
        });

        await expect(queue.awaitAll()).resolves.toBeUndefined();

        expect(executedTasks).toEqual(['task2']);
    });
});