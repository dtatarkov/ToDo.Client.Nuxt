export class EffectsContainerMissingException extends Error
{
    constructor()
    {
        super('EffectsContainer is missing');
    }
}