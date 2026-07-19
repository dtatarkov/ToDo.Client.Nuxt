import { ObservableWritableBase } from '@client/shared';
import { InfoBlockViewmodel, type InfoBlockViewmodelState, type InfoBlockViewmodelStateRow } from './infoBlockViewmodel';

export class InfoBlockViewmodelImpl extends InfoBlockViewmodel
{
    private rows = new Array<InfoBlockViewmodelStateRow>();

    state = new ObservableWritableBase<InfoBlockViewmodelState>({
        rows: [],
        hasRows: false,
    });

    constructor()
    {
        super();
    }

    addRow(labelKey: string, content: string): void
    {
        this.rows.push({ labelKey, content });
        this.updateState();
    }

    clear(): void
    {
        this.rows = [];
        this.updateState();
    }

    [Symbol.dispose]()
    {
        this.state[Symbol.dispose]();
    }

    private updateState()
    {
        this.state.value = this.createState();
    }

    private createState(): InfoBlockViewmodelState
    {
        const state: InfoBlockViewmodelState = {
            rows: [...this.rows],
            hasRows: this.rows.length > 0,
        };

        return state;
    }
}
