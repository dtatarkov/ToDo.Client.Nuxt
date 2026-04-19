export abstract class ButtonElement extends UIElement<string> implements ButtonElementData
{
    abstract title: string;
    abstract isDisabled: boolean;
    abstract isLoading: boolean;
    abstract color: ButtonElementColor;
    abstract readonly click: Subscribable;
}