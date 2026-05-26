import { UIKitViewmodelsFactory } from "../interfaces/uikitViewmodelsFactory";
import { InputTextViewmodelImpl } from "../../forms/entities/inputElements/inputTextViewmodelImpl";
import { InputTextareaViewmodelImpl } from "../../forms/entities/inputElements/inputTextareaViewmodelImpl";
import { InputDateViewmodelImpl } from "../../forms/entities/inputElements/inputDateViewmodelImpl";
import { InputTimeViewmodelImpl } from "../../forms/entities/inputElements/inputTimeViewmodelImpl";
import { InputDateTimeViewmodelImpl } from "../../forms/entities/inputElements/inputDateTimeViewmodelImpl";
import { ButtonGeneralViewmodelImpl } from "../viewmodels/buttons/buttonGeneralViewmodelImpl";
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
import { ButtonIconViewmodelImpl } from '../viewmodels/buttons/buttonIconViewmodelImpl';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import type { CardViewmodel } from '../interfaces/cardViewmodel';
import { CardViewmodelImpl } from '../viewmodels/cardViewmodelImpl';
import type { ToolbarViewmodel } from '../interfaces/toolbarViewmodel';
import { ToolbarViewmodelImpl } from '../viewmodels/toolbarViewmodelImpl';
import type { MaybeObservable } from '@/modules/shared/interfaces/maybeObservable';
import type { InputTextViewmodel } from '../../forms/entities/inputElements/inputTextViewmodel';
import type { InputDateViewmodel } from '../../forms/entities/inputElements/inputDateViewmodel';
import type { InputTextareaViewmodel } from '../../forms/entities/inputElements/inputTextareaViewmodel';
import type { InputTimeViewmodel } from '../../forms/entities/inputElements/inputTimeViewmodel';
import type { InputDateTimeViewmodel } from '../../forms/entities/inputElements/inputDateTimeViewmodel';

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

    override createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel
    {
        const button = new ButtonGeneralViewmodelImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel
    {
        const button = new ButtonIconViewmodelImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createGrid<T extends Viewmodel = Viewmodel>(source?: MaybeObservable<T[]>): GridViewmodel<T>
    {
        const grid = new GridViewmodelImpl<T>();

        if (source)
        {
            grid.setSource(source);
        }

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