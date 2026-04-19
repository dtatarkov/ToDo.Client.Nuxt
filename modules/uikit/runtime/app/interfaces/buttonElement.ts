export abstract class ButtonElement extends UIElement<string> implements ButtonElementData
{
    abstract title: string;
    abstract color: ButtonElementColor;
    abstract readonly click: Subscribable;
}