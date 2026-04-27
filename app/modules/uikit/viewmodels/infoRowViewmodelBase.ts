import VInfoRow from "../components/VInfoRow.vue";
import { InfoRowViewmodel } from "../interfaces/infoRowViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";

export class InfoRowViewmodelBase extends InfoRowViewmodel
{
    private readonly _props = reactive({
        label: '',
        content: '',
    });

    readonly key = getUniqueId('info-row-element');

    readonly component = {
        setup: () =>
        {
            return () => h(VInfoRow, { label: this._props.label }, {
                default: () => this._props.content
            });
        }
    };

    get label(): string
    {
        return this._props.label;
    }

    set label(value: string)
    {
        this._props.label = value;
    }

    get content(): string
    {
        return this._props.content;
    }

    set content(value: string)
    {
        this._props.content = value;
    }
}