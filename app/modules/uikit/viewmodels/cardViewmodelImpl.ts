import VCard from "../components/VCard.vue";
import { CardViewmodel } from "../interfaces/cardViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { reactive, shallowRef } from "vue";
import type { Viewmodel } from "../interfaces/viewmodel";

export class CardViewmodelImpl extends CardViewmodel
{
    private readonly _props = reactive({
        title: '',
        description: '',
    });

    private readonly _actions = shallowRef<Viewmodel[]>([]);
    private readonly _footer = shallowRef<Viewmodel | undefined>(undefined);

    readonly key = getUniqueId('card');

    readonly component = {
        setup: () =>
        {
            return () =>
            {
                const props = this._props;
                const actions = this._actions.value;
                const footer = this._footer.value;

                return h(VCard, props, {
                    actions: () => actions.map(action =>
                        h(action.component, { key: action.key })),

                    footer: footer ? () => h(footer.component, { key: footer.key }) : undefined,
                });
            };
        }
    };

    get title(): string
    {
        return this._props.title;
    }

    set title(value: string)
    {
        this._props.title = value;
    }

    get description(): string
    {
        return this._props.description;
    }

    set description(value: string)
    {
        this._props.description = value;
    }

    get actions(): Viewmodel[]
    {
        return this._actions.value;
    }

    set actions(value: Viewmodel[])
    {
        this._actions.value = value;
    }

    get footer(): Viewmodel | undefined
    {
        return this._footer.value;
    }

    set footer(value: Viewmodel | undefined)
    {
        this._footer.value = value;
    }
}