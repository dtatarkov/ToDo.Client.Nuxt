import VToolbar from "../components/VToolbar.vue";
import { ToolbarViewmodel } from "../interfaces/toolbarViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { Viewmodel } from "../interfaces/viewmodel";

export class ToolbarViewmodelImpl<T extends Viewmodel = Viewmodel> extends ToolbarViewmodel<T>
{
    private _elements = shallowReactive(new Array<T>());

    readonly key = getUniqueId('toolbar');

    readonly component = {
        setup: () =>
        {
            return () =>
                h(VToolbar, {}, {
                    default: () => this._elements.map(element =>
                        h(element.component, { key: element.key }))
                });
        }
    };

    get elements()
    {
        return this._elements;
    }

    override addElement(element: T): void
    {
        this._elements.push(element);
    }
}