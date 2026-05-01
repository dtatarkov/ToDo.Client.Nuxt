import VGrid from "../components/VGrid.vue";
import { GridViewmodel } from "../interfaces/gridViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { Viewmodel } from "../interfaces/viewmodel";
import { useObservable } from '@/modules/shared/composables/useObservable';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import { toObservable } from '@/modules/shared/utils/toObservable';

export class GridViewmodelImpl<T extends Viewmodel = Viewmodel> extends GridViewmodel<T>
{
    private sourceWrapper = new ObservableSource<Observable<T[]>>(new ObservableSource(new Array<T>()));
    private source = new ObservableComputed(() => this.sourceWrapper.value.value);

    readonly key = getUniqueId('grid');

    readonly component = {
        setup: () =>
        {
            const elements = useObservable(this.source);

            return () => elements.value.length > 0 ?
                h(VGrid, {}, {
                    default: () => elements.value.map(element =>
                        h(element.component, { key: element.key }))
                }) :

                undefined;
        }
    };

    get elements()
    {
        return this.source.value;
    }

    override setSource(source: MaybeObservable<T[]>)
    {
        this.sourceWrapper.value = toObservable(source);
    }
}