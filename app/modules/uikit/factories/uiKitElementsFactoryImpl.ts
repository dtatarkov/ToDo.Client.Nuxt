import { UIKitElementsFactory } from "../interfaces/uiKitElementsFactory";
import { InputElement } from "../interfaces/inputElement";
import { InputElementText } from "../entities/inputElements/inputElementText";
import { InputElementTextarea } from "../entities/inputElements/inputElementTextarea";
import { InputElementDate } from "../entities/inputElements/inputElementDate";
import { InputElementTime } from "../entities/inputElements/inputElementTime";
import { InputElementDateTime } from "../entities/inputElements/inputElementDateTime";
import { ButtonElementGeneralImpl } from "../entities/buttons/buttonElementGeneralImpl";
import { GridBase } from "../entities/gridBase";
import { InfoBlockBase } from "../entities/infoBlockBase";
import type { ButtonElementGeneral, ButtonElementGeneralData } from '../interfaces/buttonElementGeneral';
import type { Grid } from '../interfaces/grid';
import type { UIElement } from '../interfaces/uiElement';
import type { InfoBlock } from '../interfaces/infoBlock';
import { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { TimeMapper } from '@/modules/shared/interfaces/timeMapper';
import { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ButtonElementIcon, ButtonElementIconData } from '../interfaces/buttonElementIcon';
import { ButtonElementIconImpl } from '../entities/buttons/buttonElementIconImpl';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

@dependency(StringsService)
@dependency(VueComponentPropsFactory)
@dependency(DataAdapterFactory)
@dependency(ZonedDateTimeMapper)
@dependency(TimeMapper)
@dependency(DatesService)
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

    override createButtonGeneral(data?: Partial<ButtonElementGeneralData>): ButtonElementGeneral
    {
        const button = new ButtonElementGeneralImpl();

        if (data != undefined)
        {
            updatePropertiesWithData(button, data);
        }

        return button;
    }

    override createButtonIcon(data?: Partial<ButtonElementIconData>): ButtonElementIcon
    {
        const button = new ButtonElementIconImpl();

        if (data != undefined)
        {
            updatePropertiesWithData(button, data);
        }

        return button;
    }

    override createGrid<T extends UIElement = UIElement>(elements: Observable<T[]>): Grid<T>
    {
        return new GridBase<T>(elements);
    }

    override createInfoBlock(): InfoBlock
    {
        return new InfoBlockBase();
    }
}