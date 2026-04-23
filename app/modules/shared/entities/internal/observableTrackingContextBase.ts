import type { ObservableTrackingContext } from '../../interfaces/internal/observableTrackingContext';
import type { Observable } from '../../interfaces/observable';

export class ObservableTrackingContextBase implements ObservableTrackingContext
{
    private observablesSet = new Set<Observable<any>>();

    get observables()
    {
        return [...this.observablesSet];
    }

    register(observable: Observable<any>): void
    {
        this.observablesSet.add(observable);
    }
}