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
    title: props.title,
    description: props.description,
    icon: props.icon,
    color: props.color,

    'onUpdate:open': handleOpen
  });
});
</script>