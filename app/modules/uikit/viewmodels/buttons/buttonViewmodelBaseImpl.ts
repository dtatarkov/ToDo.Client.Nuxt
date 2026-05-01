import { DestroyTokenBase } from '@/modules/shared/entities/destroyTokenBase';
import { EventBusBase } from '@/modules/shared/entities/eventBusBase';
import { ButtonBaseViewmodel as ButtonBaseViewmodel } from '../../interfaces/buttonBaseViewmodel';

export abstract class ButtonViewmodelBaseImpl extends ButtonBaseViewmodel
{
    protected destroyToken = new DestroyTokenBase();

    readonly click = new EventBusBase();

    override destroy(): void
    {
        if (this.destroyToken.isDestroyed)
        {
            return;
        }

        this.click.destroy();
        this.destroyToken.destroy();
    }
}
