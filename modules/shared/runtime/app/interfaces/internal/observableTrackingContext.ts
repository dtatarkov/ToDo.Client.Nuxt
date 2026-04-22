export abstract class ObservableTrackingContext
{
    abstract observables: Observable<any>[];

    abstract register(observable: Observable<any>): void;
}