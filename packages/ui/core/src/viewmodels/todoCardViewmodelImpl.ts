import { DisposeToken, ObservableWritableBase } from '@client/shared';
import { ToDoCardViewmodel, type ToDoCardViewmodelData, type ToDoCardViewmodelState } from './todoCardViewmodel';
import { DateFormatter } from '@client/infrastructure-datetime';
import { InfoBlockViewmodel } from './infoBlockViewmodel';
import { dependency } from '@client/infrastructure-di';

@dependency(DateFormatter)
@dependency(InfoBlockViewmodel)
export class ToDoCardViewmodelImpl extends ToDoCardViewmodel
{
    private disposeToken = new DisposeToken();

    state: ObservableWritableBase<ToDoCardViewmodelState>;

    constructor(
        private readonly dateFormatter: DateFormatter,
        private readonly infoBlock: InfoBlockViewmodel,
    )
    {
        super();

        this.state = new ObservableWritableBase(this.createState());
        this.disposeToken.registerDisposable(this.infoBlock);
    }

    setData(data: ToDoCardViewmodelData)
    {
        this.updateInfoBlock(data);
        this.state.value = this.createState();
    }

    [Symbol.dispose]()
    {
        this.state[Symbol.dispose]();
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
