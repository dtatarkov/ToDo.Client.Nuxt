import VInfoRow from "../components/VInfoRow.vue";
import { InfoRowViewmodel, type InfoRowData } from "../interfaces/infoRowViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { ReactiveFieldVue } from '@/modules/shared/entities/reactiveFieldVue';
import { updateReactiveFields } from '@/modules/shared/utils/updateReactiveFields';
import { isStringEmpty } from '@/modules/shared/utils/isStringEmpty';

export class InfoRowViewmodelImpl extends InfoRowViewmodel
{
    readonly key = getUniqueId('info-row-element');

    readonly component = {
        setup: () =>
        {
            return () =>
            {
                return h(VInfoRow, {
                    label: this.label.value
                }, {
                    default: !this.isEmpty ?

                        () => this.content.value :

                        undefined
                });
            };
        }
    };

    readonly label = new ReactiveFieldVue('');
    readonly content = new ReactiveFieldVue('');

    get isEmpty(): boolean
    {
        return isStringEmpty(this.content.value);
    }

    override setData(data: Partial<InfoRowData>)
    {
        updateReactiveFields(this as InfoRowViewmodel, data);
    }
}