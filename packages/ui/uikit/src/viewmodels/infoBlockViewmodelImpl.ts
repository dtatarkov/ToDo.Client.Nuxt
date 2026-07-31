import { ObservableWritableBase } from '@client/shared';
import { InfoBlockViewmodel, type InfoBlockViewmodelState, type InfoBlockViewmodelStateRow } from './infoBlockViewmodel';
import type { MessageKey } from '@client/infrastructure-messages';
import { ViewmodelBase } from '@client/ui-core';

export class InfoBlockViewmodelImpl extends ViewmodelBase<InfoBlockViewmodelState> implements InfoBlockViewmodel
{
    private rows = new Array<InfoBlockViewmodelStateRow>();

    state = new ObservableWritableBase<InfoBlockViewmodelState>({
        rows: [],
        hasRows: false,
    });

    addRow(labelKey: MessageKey, content: string): void
    {
        this.rows.push({ labelKey, content });
        this.syncState();
    }

    clear(): void
    {
        this.rows = [];
        this.syncState();
    }

    private syncState()
    {
        this.updateState({
            rows: [...this.rows],
            hasRows: this.rows.length > 0,
        });
    }
}
