import VCard from "../components/VCard.vue";
import { CardViewmodel } from "../interfaces/cardViewmodel";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { Viewmodel } from "../interfaces/viewmodel";
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { useService } from '@/modules/shared/composables/useService';
import { ReactiveFieldVue } from '@/modules/shared/entities/reactiveFieldVue';

export class CardViewmodelImpl extends CardViewmodel
{
    readonly title = new ReactiveFieldVue('');
    readonly description = new ReactiveFieldVue('');
    readonly actions = new ReactiveFieldVue(new Array<Viewmodel>());
    readonly footer = new ReactiveFieldVue<Viewmodel | undefined>(undefined);


    readonly key = getUniqueId('card');

    readonly component = {
        setup: () =>
        {
            const stringsService = useService(StringsService);

            const isEmpty = computed(() => stringsService.isStringEmpty(this.title.value) &&
                stringsService.isStringEmpty(this.description.value) &&
                this.actions.value.length === 0 &&
                this.footer.value == undefined);

            return () =>
            {
                return !isEmpty.value ?

                    h(VCard, {
                        title: this.title.value,
                        description: this.description.value,
                    }, {
                        actions: this.actions.value.length > 0 ?

                            () => this.actions.value.map(action => h(action.component, { key: action.key })) :

                            undefined,

                        footer: this.footer.value ?

                            () => this.footer.value ? h(this.footer.value.component, { key: this.footer.value.key }) : undefined :

                            undefined
                    }) :

                    undefined;
            };
        }
    };
}