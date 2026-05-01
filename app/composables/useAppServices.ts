import { useFormsServices } from '@/modules/forms/composables/useFormsServices';
import { useOverlayServices } from '@/modules/overlay/composables/useOverlayServices';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';
import { useTodoServices } from '@/modules/todo/composables/useTodoServices';
import { useUIKitServices } from '@/modules/uikit/composables/useUIKitServices';

export function useAppServices()
{
    useSharedServices();
    useUIKitServices();
    useFormsServices();
    useOverlayServices();
    useTodoServices();
}