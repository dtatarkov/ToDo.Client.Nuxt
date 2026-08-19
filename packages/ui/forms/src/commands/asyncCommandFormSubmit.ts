import { AsyncCommandBase } from '@client/shared';
import type { FormValidator } from '../entities/formValidator';
import type { FormLock } from '../entities/formLock';
import type { FormEvents } from '../entities/formEvents';
import type { FormDataContext } from '../entities/formDataContext';

/**
 * Async command for form submission.
 *
 * Encapsulates the full form submit lifecycle:
 * 1. Checks that the form is not disabled
 * 2. Validates form elements
 * 3. Emits validation errors if any exist
 * 4. Disables the form during submission
 * 5. Executes the submit handler
 * 6. Re-enables the form after completion
 *
 * @example
 * ```ts
 * const submitCommand = new AsyncCommandFormSubmit(
 *     formDataContext,
 *     formLock,
 *     formValidator,
 *     formEvents,
 *     async (data) => {
 *         await api.submit(data);
 *     }
 * );
 *
 * submitCommand.onExecuting(() => setLoading(true));
 * submitCommand.onExecuted(() => navigateTo('/success'));
 * submitCommand.onIdle(() => setLoading(false));
 *
 * await submitCommand.executeAsync();
 * ```
 *
 * @template TEntity — the form data type
 */
export class AsyncCommandFormSubmit<TEntity extends Record<string, any> = Record<string, any>> extends AsyncCommandBase
{
    /**
     * Creates a form submit command.
     * 
     * @param formDataContext — form data context for retrieving current values
     * @param formLock — form lock for managing disabled/enabled state
     * @param formValidator — form validator for element validation
     * @param formEvents — form events for emitting validation errors
     * @param submitHandler — async handler for submitting data
     */
    constructor(
        private formDataContext: FormDataContext<TEntity>,
        private formLock: FormLock,
        private formValidator: FormValidator<TEntity>,
        private formEvents: FormEvents<TEntity>,
        private submitHandler: (data: Record<keyof TEntity, any>) => Promise<void>
    )
    {
        super();
    }

    /**
     * Execution logic for form submission.
     *
     * Performs validation, form locking, data submission, and unlocking.
     * @returns `true` on successful submission, `false` on validation error
     */
    protected override async handleExecution(): Promise<boolean | undefined>
    {
        this.formLock.assertNotDisabled();
        const result = this.formValidator.validate();

        if (!result.isValid)
        {
            this.formEvents.formValidationErrorEvent.emit(result.messages);
            return false;
        }

        const data = this.formDataContext.getData();

        this.formLock.disable();

        try
        {
            await this.submitHandler(data);
        }
        finally
        {
            this.formLock.enable();
        }

        return true;
    }
}
