import VGrid from "../components/VGrid.vue";
import { GridViewmodel } from "../interfaces/gridViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { Viewmodel } from "../interfaces/viewmodel";
import { h } from "vue";
import { useObservable } from '@/modules/shared/composables/useObservable';
import type { Observable } from '@/modules/shared/interfaces/observable';

export class GridViewmodelImpl<T extends Viewmodel = Viewmodel> extends GridViewmodel<T>
{
    readonly key = getUniqueId('grid');

    readonly component = {
        setup: () =>
        {
            const elements = useObservable(this.source);

            return () =>
                h(VGrid, {}, {
                    default: () => elements.value.map(element =>
                        h(element.component, { key: element.key }))
                });
        }
    };

    constructor(private source: Observable<T[]>)
    {
        super();
    }

    get elements()
    {
        return this.source.value;
    }
}