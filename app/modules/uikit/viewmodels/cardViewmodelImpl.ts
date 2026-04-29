import VCard from "../components/VCard.vue";
import { CardViewmodel } from "../interfaces/cardViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { reactive, shallowRef } from "vue";
import type { Viewmodel } from "../interfaces/viewmodel";

export class CardViewmodelImpl extends CardViewmodel
{
    private readonly props = reactive({
        title: '',
        description: '',
    });

    private readonly actionsInternal = shallowRef<Viewmodel[]>([]);
    private readonly footerInternal = shallowRef<Viewmodel | undefined>(undefined);

    readonly key = getUniqueId('card');

    readonly component = {
        setup: () =>
        {
            return () =>
            {
                const props = this.props;
                const actions = this.actionsInternal.value;
                const footer = this.footerInternal.value;

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
        return this.props.title;
    }

    set title(value: string)
    {
        this.props.title = value;
    }

    get description(): string
    {
        return this.props.description;
    }

    set description(value: string)
    {
        this.props.description = value;
    }

    get actions(): Viewmodel[]
    {
        return this.actionsInternal.value;
    }

    set actions(value: Viewmodel[])
    {
        this.actionsInternal.value = value;
    }

    get footer(): Viewmodel | undefined
    {
        return this.footerInternal.value;
    }

    set footer(value: Viewmodel | undefined)
    {
        this.footerInternal.value = value;
    }
}