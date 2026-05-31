
export abstract class UIElement
{
    abstract readonly key: string;
    abstract get vnode(): VNode;
}