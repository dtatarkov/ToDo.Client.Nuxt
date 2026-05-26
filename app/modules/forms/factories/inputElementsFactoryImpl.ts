import { InputElementsFactory } from "./inputElementsFactory";
import { InputTextViewmodelImpl } from "@/modules/uikit/viewmodels/inputElements/inputTextViewmodelImpl";
import { InputTextareaViewmodelImpl } from "@/modules/uikit/viewmodels/inputElements/inputTextareaViewmodelImpl";
import { InputDateViewmodelImpl } from "@/modules/uikit/viewmodels/inputElements/inputDateViewmodelImpl";
import { InputTimeViewmodelImpl } from "@/modules/uikit/viewmodels/inputElements/inputTimeViewmodelImpl";
import { InputDateTimeViewmodelImpl } from "@/modules/uikit/viewmodels/inputElements/inputDateTimeViewmodelImpl";
import { StringsService } from "@/modules/shared/interfaces/stringsService";
import { VueComponentPropsFactory } from "@/modules/shared/interfaces/vueComponentPropsFactory";
import { DataAdapterFactory } from "@/modules/shared/interfaces/dataAdapterFactory";
import { ZonedDateTimeMapper } from "@/modules/shared/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "@/modules/shared/interfaces/timeMapper";
import { DatesService } from "@/modules/shared/interfaces/datesService";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { InputTextViewmodel } from "@/modules/uikit/interfaces/inputTextViewmodel";
import type { InputTextareaViewmodel } from "@/modules/uikit/interfaces/inputTextareaViewmodel";
import type { InputDateViewmodel } from "@/modules/uikit/interfaces/inputDateViewmodel";
import type { InputTimeViewmodel } from "@/modules/uikit/interfaces/inputTimeViewmodel";
import type { InputDateTimeViewmodel } from "@/modules/uikit/interfaces/inputDateTimeViewmodel";

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