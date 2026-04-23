import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { InputElement } from "../interfaces/inputElement";
import { InputElementText } from "../entities/inputElements/inputElementText";
import { InputElementTextarea } from "../entities/inputElements/inputElementTextarea";
import { InputElementDate } from "../entities/inputElements/inputElementDate";
import { InputElementTime } from "../entities/inputElements/inputElementTime";
import { InputElementDateTime } from "../entities/inputElements/inputElementDateTime";
import { ButtonElementBase } from "../entities/buttonElementBase";
import type { ButtonElement } from '../interfaces/buttonElement';
import type { DataAdapterFactory } from '@shared/interfaces/dataAdapterFactory';
import type { DatesService } from '@shared/interfaces/datesService';
import type { StringsService } from '@shared/interfaces/stringsService';
import type { TimeMapper } from '@shared/interfaces/timeMapper';
import type { VueComponentPropsFactory } from '@shared/interfaces/vueComponentPropsFactory';
import type { ZonedDateTimeMapper } from '@shared/interfaces/zonedDateTimeMapper';

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

    override createInputText(): InputElement<string>
    {
        return new InputElementText(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createTextarea(): InputElement<string>
    {
        return new InputElementTextarea(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDate(): InputElement<Date | undefined>
    {
        return new InputElementDate(
            this.zonedDateTimeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputTime(): InputElement<number | undefined>
    {
        return new InputElementTime(
            this.timeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDateTime(): InputElement<Date | undefined>
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

    override createButton(): ButtonElement
    {
        return new ButtonElementBase();
    }
}