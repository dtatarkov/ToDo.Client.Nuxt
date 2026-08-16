import type { Action } from '../types/action';
import type { Subscribable } from '../interfaces/subscribable';
import type { DisposeToken } from '../entities/disposeToken';

/**
 * Subscribes to multiple `Subscribable` instances.
 * When any of them emits, schedules the handler to be called once per event
 * loop cycle via `queueMicrotask`.
 *
 * @param subscribables - array of subscribable sources
 * @param handler - callback invoked when any source emits
 * @param disposeToken - optional token to unregister all subscriptions
 */
export function onMany(
    subscribables: Subscribable<any>[],
    handler: Action<[]>,
    disposeToken?: DisposeToken
): void
{
    let pending = false;

    for (const source of subscribables)
    {
        source.on(() =>
        {
            if (!pending)
            {
                pending = true;
                queueMicrotask(() =>
                {
                    pending = false;
                    handler();
                });
            }
        }, disposeToken);
    }
}
