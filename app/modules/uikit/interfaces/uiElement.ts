
export abstract class UIElement
{
    abstract key: string;
    abstract get vnode(): VNode;
}