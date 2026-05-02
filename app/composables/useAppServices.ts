import { useFormsServices } from '@/modules/forms/composables/useFormsServices';
import { useOverlayServices } from '@/modules/overlay/composables/useOverlayServices';
import { useServicesContainer } from '@/modules/shared/composables/useServicesContainer';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';
import { useTodoServices } from '@/modules/todo/composables/useTodoServices';
import { useUIKitServices } from '@/modules/uikit/composables/useUIKitServices';

export function useAppServices()
{
    useServicesContainer(true);

    useSharedServices();
    useUIKitServices();
    useFormsServices();
    useOverlayServices();
    useTodoServices();
}