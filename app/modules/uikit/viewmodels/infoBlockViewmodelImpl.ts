import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import VInfoBlock from "../components/VInfoBlock.vue";
import { InfoBlockViewmodel } from "../interfaces/infoBlockViewmodel";
import { InfoRowViewmodel, type InfoRowData } from "../interfaces/infoRowViewmodel";
import { InfoRowViewmodelImpl } from "./infoRowViewmodelImpl";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { StringsService } from '@/modules/shared/interfaces/stringsService';

export class InfoBlockViewmodelImpl extends InfoBlockViewmodel
{
    readonly key = getUniqueId('info-block');

    readonly component = {
        setup: () =>
        {
            return () => h(VInfoBlock, {}, {
                default: () => this.rowsVisible.value.map(row =>
                    h(row.component, { key: row.key }))
            });
        }
    };

    private readonly rowsInternal = shallowRef(new Array<InfoRowViewmodel>());
    private readonly rowsVisible = computed(() => this.rowsInternal.value.filter(row => !row.isEmpty));

    constructor(
        private stringsService: StringsService
    )
    {
        super();
    }

    get rows(): InfoRowViewmodel[]
    {
        return this.rowsInternal.value;
    }

    get isEmpty(): boolean
    {
        return this.rowsVisible.value.length === 0;
    }

    override createRow(data?: Partial<InfoRowData>): InfoRowViewmodel
    {
        const row = new InfoRowViewmodelImpl(this.stringsService);

        if (data != undefined)
        {
            updatePropertiesWithData(row, data);
        }

        this.rowsInternal.value = [...this.rowsInternal.value, row];

        return row;
    }
}