import VInfoBlock from "../components/VInfoBlock.vue";
import { InfoBlockViewmodel } from "../interfaces/infoBlockViewmodel";
import type { InfoRowViewmodel, InfoRowData } from "../interfaces/infoRowViewmodel";
import { InfoRowViewmodelImpl } from "./infoRowViewmodelImpl";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";

export class InfoBlockViewmodelImpl extends InfoBlockViewmodel
{
    readonly key = getUniqueId('info-block');

    readonly component = {
        setup: () =>
        {
            return () => !this.isEmpty ?
                h(VInfoBlock, {}, {
                    default: () => this.rowsVisible.value.map(row =>
                        h(row.component, { key: row.key }))
                }) :

                undefined;
        }
    };

    private readonly rowsInternal = shallowRef(new Array<InfoRowViewmodel>());
    private readonly rowsVisible = computed(() => this.rowsInternal.value.filter(row => !row.isEmpty));


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
        const row = new InfoRowViewmodelImpl();

        if (data != undefined)
        {
            row.setData(data);
        }

        this.rowsInternal.value = [...this.rowsInternal.value, row];

        return row;
    }

    override clear()
    {
        this.rowsInternal.value = [];
    }
}