import { DisposeToken, ObservableWritableBase } from '@client/shared';
import { ToDoCardViewmodel, type ToDoCardViewmodelData, type ToDoCardViewmodelState } from './todoCardViewmodel';
import { DateFormatter } from '@client/infrastructure-datetime';
import { dependency } from '@client/infrastructure-di';
import { InfoBlockViewmodel } from '@client/ui-uikit';
import { ViewmodelBase } from '@client/ui-core';

@dependency(DateFormatter)
@dependency(InfoBlockViewmodel)
export class ToDoCardViewmodelImpl extends ViewmodelBase<ToDoCardViewmodelState> implements ToDoCardViewmodel
{
    private disposeToken = new DisposeToken();

    state: ObservableWritableBase<ToDoCardViewmodelState>;

    constructor(
        private readonly dateFormatter: DateFormatter,
        private readonly infoBlock: InfoBlockViewmodel,
    )
    {
        super();

        const initialState = this.createState();

        this.state = new ObservableWritableBase(initialState);
        this.disposeToken.registerDisposable(this.infoBlock);
    }

    setData(data: ToDoCardViewmodelData)
    {
        this.updateInfoBlock(data);
        this.syncState();
    }

    private syncState()
    {
        const newState = this.createState();
        this.updateState(newState);
    }

    private createState(): ToDoCardViewmodelState
    {
        const state = {
            infoBlock: this.infoBlock.state.value,
            hasFooter: this.hasFooter()
        };

        return state;
    }

    private updateInfoBlock(data: ToDoCardViewmodelData)
    {
        this.infoBlock.clear();

        if (data.completionDateActual)
        {
            const formattedCompletionDateActual = this.dateFormatter.formatDateOptional(data.completionDateActual);

            this.infoBlock.addRow('todo.card.completed', formattedCompletionDateActual);
        }

        if (data.completionDatePlanned)
        {
            const formattedCompletionDatePlanned = this.dateFormatter.formatDateOptional(data.completionDatePlanned);

            this.infoBlock.addRow('todo.card.completeBy', formattedCompletionDatePlanned);
        }
    }

    private hasFooter()
    {
        const result = this.infoBlock.state.value.hasRows;

        return result;
    }
}
