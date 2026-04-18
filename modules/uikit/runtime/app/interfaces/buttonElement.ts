export abstract class ButtonElement extends UIElement<string> implements ButtonElementData
{
    abstract title: string;

    abstract readonly click: Subscribable;
}