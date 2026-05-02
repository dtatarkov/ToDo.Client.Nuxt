import { UIKitViewmodelsFactory } from "../interfaces/uikitViewmodelsFactory";
import { InputViewmodel } from "../interfaces/inputViewmodel";
import { InputViewmodelText } from "../viewmodels/inputElements/inputViewmodelText";
import { InputViewmodelTextarea } from "../viewmodels/inputElements/inputViewmodelTextarea";
import { InputViewmodelDate } from "../viewmodels/inputElements/inputViewmodelDate";
import { InputViewmodelTime } from "../viewmodels/inputElements/inputViewmodelTime";
import { InputViewmodelDateTime } from "../viewmodels/inputElements/inputViewmodelDateTime";
import { ButtonViewmodelGeneralImpl } from "../viewmodels/buttons/buttonViewmodelGeneralImpl";
import { GridViewmodelImpl } from "../viewmodels/gridViewmodelImpl";
import { InfoBlockViewmodelImpl } from "../viewmodels/infoBlockViewmodelImpl";
import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData, ButtonGeneralViewmodelHandlers } from '../interfaces/buttonGeneralViewmodel';
import type { GridViewmodel } from '../interfaces/gridViewmodel';
import type { Viewmodel } from '../interfaces/viewmodel';
import type { InfoBlockViewmodel } from '../interfaces/infoBlockViewmodel';
import { DataAdapterFactory } from '@/modules/shared/interfaces/dataAdapterFactory';
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { TimeMapper } from '@/modules/shared/interfaces/timeMapper';
import { VueComponentPropsFactory } from '@/modules/shared/interfaces/vueComponentPropsFactory';
import { ZonedDateTimeMapper } from '@/modules/shared/interfaces/zonedDateTimeMapper';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ButtonIconViewmodel, ButtonIconViewmodelData, ButtonIconViewmodelHandlers } from '../interfaces/buttonIconViewmodel';
import { ButtonViewmodelIconImpl } from '../viewmodels/buttons/buttonViewmodelIconImpl';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import type { CardViewmodel } from '../interfaces/cardViewmodel';
import { CardViewmodelImpl } from '../viewmodels/cardViewmodelImpl';
import type { ToolbarViewmodel } from '../interfaces/toolbarViewmodel';
import { ToolbarViewmodelImpl } from '../viewmodels/toolbarViewmodelImpl';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';

@dependency(StringsService)
@dependency(VueComponentPropsFactory)
@dependency(DataAdapterFactory)
@dependency(ZonedDateTimeMapper)
@dependency(TimeMapper)
@dependency(DatesService)
export class UIKitViewmodelFactoryImpl extends UIKitViewmodelsFactory
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

    override createInputText(): InputViewmodel<string>
    {
        return new InputViewmodelText(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createTextarea(): InputViewmodel<string>
    {
        return new InputViewmodelTextarea(
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDate(): InputViewmodel<Date | undefined>
    {
        return new InputViewmodelDate(
            this.zonedDateTimeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputTime(): InputViewmodel<number | undefined>
    {
        return new InputViewmodelTime(
            this.timeMapper,
            this.stringsService,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createInputDateTime(): InputViewmodel<Date | undefined>
    {
        return new InputViewmodelDateTime(
            this.datesService,
            this.stringsService,
            this.zonedDateTimeMapper,
            this.timeMapper,
            this.vueComponentPropsFactory,
            this.dataAdapterFactory,
        );
    }

    override createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel
    {
        const button = new ButtonViewmodelGeneralImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel
    {
        const button = new ButtonViewmodelIconImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createGrid<T extends Viewmodel = Viewmodel>(source: MaybeObservable<T[]>): GridViewmodel<T>
    {
        const grid = new GridViewmodelImpl<T>();
        grid.setSource(source);

        return grid;
    }

    override createInfoBlock(): InfoBlockViewmodel
    {
        return new InfoBlockViewmodelImpl(this.stringsService);
    }

    override createCard(): CardViewmodel
    {
        return new CardViewmodelImpl();
    }

    override createToolbar<T extends Viewmodel = Viewmodel<string | number>>(): ToolbarViewmodel<T>
    {
        return new ToolbarViewmodelImpl();
    }
}