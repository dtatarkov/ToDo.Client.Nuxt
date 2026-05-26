import { InputElementsFactory } from "./inputElementsFactory";
import { InputTextViewmodelImpl } from "@/modules/forms/entities/inputElements/inputTextViewmodelImpl";
import { InputTextareaViewmodelImpl } from "@/modules/forms/entities/inputElements/inputTextareaViewmodelImpl";
import { InputDateViewmodelImpl } from "@/modules/forms/entities/inputElements/inputDateViewmodelImpl";
import { InputTimeViewmodelImpl } from "@/modules/forms/entities/inputElements/inputTimeViewmodelImpl";
import { InputDateTimeViewmodelImpl } from "@/modules/forms/entities/inputElements/inputDateTimeViewmodelImpl";
import { StringsService } from "@/modules/shared/interfaces/stringsService";
import { VueComponentPropsFactory } from "@/modules/shared/interfaces/vueComponentPropsFactory";
import { DataAdapterFactory } from "@/modules/shared/interfaces/dataAdapterFactory";
import { ZonedDateTimeMapper } from "@/modules/shared/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "@/modules/shared/interfaces/timeMapper";
import { DatesService } from "@/modules/shared/interfaces/datesService";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { InputTextViewmodel } from "@/modules/forms/entities/inputElements/inputTextViewmodel";
import type { InputTextareaViewmodel } from "@/modules/forms/entities/inputElements/inputTextareaViewmodel";
import type { InputDateViewmodel } from "@/modules/forms/entities/inputElements/inputDateViewmodel";
import type { InputTimeViewmodel } from "@/modules/forms/entities/inputElements/inputTimeViewmodel";
import type { InputDateTimeViewmodel } from "@/modules/forms/entities/inputElements/inputDateTimeViewmodel";

@dependency(StringsService)
@dependency(VueComponentPropsFactory)
@dependency(DataAdapterFactory)
@dependency(ZonedDateTimeMapper)
@dependency(TimeMapper)
@dependency(DatesService)
export class InputElementsFactoryImpl extends InputElementsFactory
{
    constructor(
        private stringsService: StringsService,
        private vueComponentPropsFactory: VueComponentPropsFactory,
        private dataAdapterFactory: DataAdapterFactory,
        private zonedDateTimeMapper: ZonedDateTimeMapper,
        private timeMapper: TimeMapper,
        private datesService: DatesService,
    )
    {
        super();
    }

    override createInputText(): InputTextViewmodel
    {
        return new InputTextViewmodelImpl(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createTextarea(): InputTextareaViewmodel
    {
        return new InputTextareaViewmodelImpl(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDate(): InputDateViewmodel
    {
        return new InputDateViewmodelImpl(
            this.zonedDateTimeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputTime(): InputTimeViewmodel
    {
        return new InputTimeViewmodelImpl(
            this.timeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDateTime(): InputDateTimeViewmodel
    {
        return new InputDateTimeViewmodelImpl(
            this.datesService,
            this.stringsService,
            this.zonedDateTimeMapper,
            this.timeMapper,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }
}