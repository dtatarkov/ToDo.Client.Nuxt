export abstract class FormLock
{
    abstract isDisabled(): boolean;
    abstract enable(): void;
    abstract disable(): void;
    abstract assertNotDisabled(): void;
}