import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { InputElement } from "../interfaces/inputElement";
import { InputElementText } from "../entities/inputElements/inputElementText";
import { InputElementTextarea } from "../entities/inputElements/inputElementTextarea";
import { InputElementDate } from "../entities/inputElements/inputElementDate";
import { InputElementTime } from "../entities/inputElements/inputElementTime";
import { InputElementDateTime } from "../entities/inputElements/inputElementDateTime";

export class UIKitElementsFactoryImpl extends UIKitElementsFactory
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

    createInputText(): InputElement<string>
    {
        return new InputElementText(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    createTextarea(): InputElement<string>
    {
        return new InputElementTextarea(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    createInputDate(): InputElement<Date | undefined>
    {
        return new InputElementDate(
            this.zonedDateTimeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    createInputTime(): InputElement<number | undefined>
    {
        return new InputElementTime(
            this.timeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    createInputDateTime(): InputElement<Date | undefined>
    {
        return new InputElementDateTime(
            this.datesService,
            this.stringsService,
            this.zonedDateTimeMapper,
            this.timeMapper,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }
}