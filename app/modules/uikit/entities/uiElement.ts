
export abstract class UIElement implements Disposable
{
    abstract readonly key: string;
    abstract get vnode(): VNode | undefined;
    abstract [Symbol.dispose](): void;
}