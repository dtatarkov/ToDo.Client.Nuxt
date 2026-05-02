import VToolbar from "../components/VToolbar.vue";
import { ToolbarViewmodel } from "../interfaces/toolbarViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { Viewmodel } from "../interfaces/viewmodel";

export class ToolbarViewmodelImpl<T extends Viewmodel = Viewmodel> extends ToolbarViewmodel<T>
{
    private elementsInternal = shallowReactive(new Array<T>());

    readonly key = getUniqueId('toolbar');

    readonly component = {
        setup: () =>
        {
            return () => this.elementsInternal.length > 0 ?

                h(VToolbar, {}, {
                    default: () => this.elementsInternal.map(element =>
                        h(element.component, { key: element.key }))
                }) :

                undefined;
        }
    };

    get elements()
    {
        return this.elementsInternal;
    }

    override addElement(element: T): void
    {
        this.elementsInternal.unshift(element);
    }
}