export abstract class UIKitElementsFactory
{
    abstract createInputText(): InputElement<string>;
    abstract createTextarea(): InputElement<string>;
    abstract createInputDate(): InputElement<Date | undefined>;
    abstract createInputTime(): InputElement<number | undefined>;
    abstract createInputDateTime(): InputElement<Date | undefined>;
}