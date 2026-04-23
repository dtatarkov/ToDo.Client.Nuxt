import type { Action } from '../types/action';
import { Destroyable } from './destroyable';

export abstract class Subscribable<T = void> extends Destroyable
{
  abstract subscribe(handler: Action<[T]>): Action;
}

