import VInfoRow from "../components/VInfoRow.vue";
import { InfoRow } from "../interfaces/infoRow";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { h } from "vue";
import { reactive } from "vue";

export class InfoRowBase extends InfoRow
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