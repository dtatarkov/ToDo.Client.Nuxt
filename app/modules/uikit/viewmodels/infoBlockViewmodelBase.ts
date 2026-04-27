import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import VInfoBlock from "../components/VInfoBlock.vue";
import { InfoBlockViewmodel } from "../interfaces/infoBlockViewmodel";
import { InfoRowViewmodel, type InfoRowData } from "../interfaces/infoRowViewmodel";
import { InfoRowViewmodelBase } from "./infoRowViewmodelBase";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { useService } from '@/modules/shared/composables/useService';

export class InfoBlockViewmodelBase extends InfoBlockViewmodel
{
    readonly key = getUniqueId('info-block');

    readonly component = {
        setup: () =>
        {
            const stringsService = useService(StringsService);

            const visibleRows = computed(() => this._rows.value.filter(row => !stringsService.isStringEmpty(row.content)));

            return () => h(VInfoBlock, {}, {
                default: () => visibleRows.value.map(row =>
                    h(row.component, { key: row.key }))
            });
        }
    };

    private readonly _rows = shallowRef(new Array<InfoRowViewmodel>());

    get rows(): InfoRowViewmodel[]
    {
        return this._rows.value;
    }

    override createRow(data?: Partial<InfoRowData>): InfoRowViewmodel
    {
        const row = new InfoRowViewmodelBase();

        if (data != undefined)
        {
            updatePropertiesWithData(row, data);
        }

        this._rows.value = [...this._rows.value, row];

        return row;
    }
}