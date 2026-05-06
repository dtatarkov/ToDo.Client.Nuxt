import { Observable } from '../../interfaces/observable';
import type { Action } from '../../types/action';
import { once } from '../../utils/once';
import { DestroyTokenImpl } from '../destroyTokenImpl';
import { effectScope, watch } from 'vue';

export abstract class ObservableVue<T> extends Observable<T>
{
  private readonly scope = effectScope(true);

  protected abstract readonly ref: Ref<T>;
  protected readonly destroyToken = new DestroyTokenImpl();

  override subscribe(handler: Action<[T]>): Action
  {
    this.destroyToken.assertNotDestroyed();

    const result = this.scope.run(() =>
    {
      const unsubscribe = watch(this.ref, (value) =>
      {
        handler(value);
      }, { flush: 'sync' });

      return once(() =>
      {
        unsubscribe();
      });
    });

    if (result == undefined)
    {
      throw new Error('Unknown Subscription error');
    }

    return result;
  }

  override destroy(): void
  {
    this.destroyToken.destroy();
  }
}