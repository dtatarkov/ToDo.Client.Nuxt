<script setup lang="ts">
import type { NotificationData } from '../types/notificationData';

const props = defineProps<NotificationData>();

const emits = defineEmits<{
  (e: 'close'): void,
}>();

const toast = useToast();

function handleOpen(isOpen: boolean) {
  if (!isOpen) 
  {
    emits('close');
  }
}

onMounted(() =>
{
  toast.add({
    ...props,
    progress: false,

    'onUpdate:open': handleOpen
  });
});
</script>