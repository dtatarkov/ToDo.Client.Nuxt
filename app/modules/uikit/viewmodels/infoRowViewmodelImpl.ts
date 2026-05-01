import type { StringsService } from '@/modules/shared/interfaces/stringsService';
import VInfoRow from "../components/VInfoRow.vue";
import { InfoRowViewmodel } from "../interfaces/infoRowViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";

export class InfoRowViewmodelImpl extends InfoRowViewmodel
{
    private readonly props = reactive({
        label: '',
        content: '',
    });

    readonly key = getUniqueId('info-row-element');

    readonly component = {
        setup: () =>
        {
            return () => h(VInfoRow, { label: this.props.label }, {
                default: () => this.props.content
            });
        }
    };

    constructor(
        private stringsService: StringsService
    )
    {
        super();
    }

    get label(): string
    {
        return this.props.label;
    }

    set label(value: string)
    {
        this.props.label = value;
    }

    get content(): string
    {
        return this.props.content;
    }

    set content(value: string)
    {
        this.props.content = value;
    }

    get isEmpty(): boolean
    {
        return this.stringsService.isStringEmpty(this.props.content);
    }
}