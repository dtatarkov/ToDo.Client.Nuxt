import type { MessageKey } from '../types/messageKey';

export abstract class MessagesService
{
    /**
     * Label for the task title input field.
     * @see {@link i18n/locales/ru.json} - key: `todo.field.title.label`
     */
    abstract getMessage(key: 'todo.field.title.label'): string;

    /**
     * Placeholder text for the task title input field.
     * @see {@link i18n/locales/ru.json} - key: `todo.field.title.placeholder`
     */
    abstract getMessage(key: 'todo.field.title.placeholder'): string;

    /**
     * Validation error message for empty todo title.
     * @see {@link i18n/locales/ru.json} - key: 'todo.field.title.errors.empty'
     */
    abstract getMessage(key: 'todo.field.title.errors.empty'): string;

    /**
     * Label for the task description input field.
     * @see {@link i18n/locales/ru.json} - key: `todo.field.description.label`
     */
    abstract getMessage(key: 'todo.field.description.label'): string;

    /**
     * Placeholder text for the task description input field.
     * @see {@link i18n/locales/ru.json} - key: `todo.field.description.placeholder`
     */
    abstract getMessage(key: 'todo.field.description.placeholder'): string;

    /**
     * Label for the planned completion date field.
     * @see {@link i18n/locales/ru.json} - key: `todo.field.completionDatePlanned.label`
     */
    abstract getMessage(key: 'todo.field.completionDatePlanned.label'): string;

    /**
     * Label for showing all notifications in timeline.
     * @see {@link i18n/locales/ru.json} - key: `timeline.showAllNotifications`
     */
    abstract getMessage(key: 'timeline.showAllNotifications'): string;

    /**
     * Label for the completed date in the todo card.
     * @see {@link i18n/locales/ru.json} - key: `todo.card.completed`
     */
    abstract getMessage(key: 'todo.card.completed'): string;

    /**
     * Label for the complete by date in the todo card.
     * @see {@link i18n/locales/ru.json} - key: `todo.card.completeBy`
     */
    abstract getMessage(key: 'todo.card.completeBy'): string;

    /**
     * Title for the notification shown when task creation fails.
     * @see {@link i18n/locales/ru.json} - key: `todo.notification.createError.title`
     */
    abstract getMessage(key: 'todo.notification.createError.title'): string;

    /**
     * Title for the notification shown when task update fails.
     * @see {@link i18n/locales/ru.json} - key: `todo.notification.updateError.title`
     */
    abstract getMessage(key: 'todo.notification.updateError.title'): string;

    /**
     * Title for the create task modal dialog.
     * @see {@link i18n/locales/ru.json} - key: `todo.modal.create.title`
     */
    abstract getMessage(key: 'todo.modal.create.title'): string;

    /**
     * Title for the edit task modal dialog.
     * @see {@link i18n/locales/ru.json} - key: `todo.modal.edit.title`
     */
    abstract getMessage(key: 'todo.modal.edit.title'): string;

    /**
     * Label for the create (add) button.
     * @see {@link i18n/locales/ru.json} - key: `button.create`
     */
    abstract getMessage(key: 'button.create'): string;

    /**
     * Label for the save button.
     * @see {@link i18n/locales/ru.json} - key: `button.save`
     */
    abstract getMessage(key: 'button.save'): string;

    /**
     * Label for the cancel button.
     * @see {@link i18n/locales/ru.json} - key: `button.cancel`
     */
    abstract getMessage(key: 'button.cancel'): string;

    /**
     * Label for the add button in the todos toolbar.
     * @see {@link i18n/locales/ru.json} - key: `todos.toolbar.buttons.add`
     */
    abstract getMessage(key: 'todos.toolbar.buttons.add'): string;

    /**
     * Fallback overload for dynamic keys (used internally by the implementation).
     * @param key - The message key
     * @param params - Optional interpolation parameters
     */
    abstract getMessage(key?: MessageKey, params?: Record<string, string | number>): string;
}
