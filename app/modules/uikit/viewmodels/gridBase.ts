import VGrid from "../components/VGrid.vue";
import { Grid } from "../interfaces/grid";
import { ObservableSource } from "@/modules/shared/entities/observableSource";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { UIElement } from "../interfaces/uiElement";
import { h } from "vue";
import { useObservable } from '@/modules/shared/composables/useObservable';
import type { Observable } from '@/modules/shared/interfaces/observable';

export class GridBase<T extends UIElement = UIElement> extends Grid<T>
{
    readonly key = getUniqueId('grid');

    readonly component = {
        setup: () =>
        {
            const elements = useObservable(this._elements);

            return () =>
                h(VGrid, {}, {
                    default: () => elements.value.map(element =>
                        h(element.component, { key: element.key }))
                });
        }
    };

    constructor(private _elements: Observable<T[]>)
    {
        super();
    }

    get elements()
    {
        return this._elements.value;
    }
}