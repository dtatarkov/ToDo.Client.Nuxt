import type { SidebarContent } from './sidebarContent';


export abstract class SidebarContentActivator
{
    abstract activateContent(content: SidebarContent): void;
    abstract deactivateContent(content: SidebarContent): void;
}
