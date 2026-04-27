import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import VInfoBlock from "../components/VInfoBlock.vue";
import { InfoBlock } from "../interfaces/infoBlock";
import { InfoRow, type InfoRowData } from "../interfaces/infoRow";
import { InfoRowBase } from "./infoRowBase";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { useService } from '@/modules/shared/composables/useService';

export class InfoBlockBase extends InfoBlock
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

    private readonly _rows = shallowRef(new Array<InfoRow>());

    get rows(): InfoRow[]
    {
        return this._rows.value;
    }

    override createRow(data?: Partial<InfoRowData>): InfoRow
    {
        const row = new InfoRowBase();

        if (data != undefined)
        {
            updatePropertiesWithData(row, data);
        }

        this._rows.value = [...this._rows.value, row];

        return row;
    }
}