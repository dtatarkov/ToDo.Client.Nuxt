export class ContainerNotFoundException extends Error
{
    constructor()
    {
        super('Container not found');
    }
}