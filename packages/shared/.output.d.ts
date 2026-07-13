declare module "src/constants/dateConstants" {
    export const secondInMilliseconds = 1000;
    export const minuteInMilliseconds: number;
    export const hourInMilliseconds: number;
    export const dayInMilliseconds: number;
}
declare module "src/types/action" {
    export type Action<T extends any[] = []> = (...args: T) => void;
}
declare module "src/exceptions/disposedException" {
    export class DisposedException extends Error {
        constructor();
    }
}
declare module "src/entities/disposeToken" {
    import type { Action } from "src/types/action";
    export class DisposeToken implements Disposable {
        private isDisposedInternal;
        private disposeHandlers;
        get isDisposed(): boolean;
        createChildToken(): DisposeToken;
        reset(): void;
        onDispose(handler: Action): void;
        assertNotDisposed(): void;
        [Symbol.dispose](): void;
    }
}
declare module "src/entities/asyncCommand" {
    import type { Action } from "src/types/action";
    import type { DisposeToken } from "src/entities/disposeToken";
    export abstract class AsyncCommand {
        abstract executeAsync(): Promise<boolean>;
        abstract onIdle(handler: Action, token?: DisposeToken): void;
        abstract onExecuting(handler: Action, token?: DisposeToken): void;
        abstract onExecuted(handler: Action, token?: DisposeToken): void;
    }
}
declare module "src/types/func" {
    export type Func<R, T extends any[] = any[]> = (...args: T) => R;
}
declare module "src/interfaces/subscribable" {
    import type { Action } from "src/types/action";
    import type { DisposeToken } from "src/entities/disposeToken";
    export interface Subscribable<T> extends Disposable {
        on(handler: Action<[T]>, disposeToken?: DisposeToken): void;
    }
}
declare module "src/entities/entityEvent" {
    import type { Action } from "src/types/action";
    import { DisposeToken } from "src/entities/disposeToken";
    import type { Subscribable } from "src/interfaces/subscribable";
    export type EntityEventConfiguration = {
        deferred?: boolean;
        skipEmitOnSameValue?: boolean;
    };
    export class EntityEvent<T = void> implements Subscribable<T>, Disposable {
        private eventDisposeToken;
        private handlers;
        private isDeferred;
        private emitter;
        constructor(configuration?: EntityEventConfiguration);
        on(handler: Action<[T]>, callbackDisposeToken?: DisposeToken): void;
        emit(value: T): void;
        [Symbol.dispose](): void;
    }
}
declare module "src/enums/commandState" {
    export enum CommandState {
        idle = 0,
        executing = 1
    }
}
declare module "src/entities/asyncCommandBase" {
    import type { Func } from "src/types/func";
    import type { Action } from "src/types/action";
    import { DisposeToken } from "src/entities/disposeToken";
    import { AsyncCommand } from "src/entities/asyncCommand";
    export class AsyncCommandBase extends AsyncCommand {
        private executeInternal;
        private state;
        private onIdleEvent;
        private onExecutingEvent;
        private onExecutedEvent;
        private disposeToken;
        constructor(executeInternal: Func<Promise<boolean | undefined | void>>);
        onIdle(handler: Action, token?: DisposeToken): void;
        onExecuting(handler: Action, token?: DisposeToken): void;
        onExecuted(handler: Action, token?: DisposeToken): void;
        executeAsync(): Promise<boolean>;
        [Symbol.dispose](): void;
        private setState;
    }
}
declare module "src/exceptions/initializedException" {
    export class InitializedException extends Error {
        constructor();
    }
}
declare module "src/exceptions/notInitializedException" {
    export class NotInitializedException extends Error {
        constructor();
    }
}
declare module "src/entities/initializationToken" {
    export class InitializationToken {
        private isInitializedInternal;
        /**
         * Gets whether the token has been initialized.
         */
        get isInitialized(): boolean;
        /**
         * Asserts that the token is initialized.
         * @throws {NotInitializedException} If the token is not initialized
         */
        assertInitialized(): void;
        /**
         * Asserts that the token is not initialized.
         * @throws {InitializedException} If the token is already initialized
         */
        assertNotInitialized(): void;
        /**
         * Initializes the token, marking it as initialized.
         * Subsequent calls to init() have no effect.
         */
        initialize(): void;
    }
}
declare module "src/entities/observableWritable" {
    import type { Subscribable } from "src/interfaces/subscribable";
    export type ObservableWritableConfiguration = {
        deferred?: boolean;
        skipEmitOnSameValue?: boolean;
    };
    export interface ObservableWritable<T> extends Subscribable<T> {
        value: T;
    }
}
declare module "src/entities/observableArray" {
    import type { ObservableWritable } from "src/entities/observableWritable";
    export interface ObservableArray<T> extends ObservableWritable<T[]> {
        add(element: T): void;
        remove(element: T): boolean;
    }
}
declare module "src/entities/observableReadonly" {
    import type { Subscribable } from "src/interfaces/subscribable";
    export interface ObservableReadonly<T> extends Subscribable<T> {
        readonly value: T;
    }
    export function isObservable(value: unknown): value is ObservableReadonly<any>;
}
declare module "src/entities/observableWritableBase" {
    import type { Action } from "src/types/action";
    import type { DisposeToken } from "src/entities/disposeToken";
    import type { ObservableReadonly } from "src/entities/observableReadonly";
    import type { ObservableWritable, ObservableWritableConfiguration } from "src/entities/observableWritable";
    export class ObservableWritableBase<T> implements ObservableWritable<T>, Disposable {
        private event;
        private valueInternal;
        constructor(defaultValue: T, configuration?: ObservableWritableConfiguration);
        get value(): T;
        set value(value: T);
        protected notifySubscribers(): void;
        on(handler: Action<[T]>, disposeToken?: DisposeToken): void;
        toReadonly(): ObservableReadonly<T>;
        [Symbol.dispose](): void;
    }
}
declare module "src/utils/removeFromArray" {
    export function removeFromArray<T>(array: T[], element: T): boolean;
}
declare module "src/entities/observableArrayBase" {
    import { ObservableWritableBase } from "src/entities/observableWritableBase";
    import type { ObservableArray } from "src/entities/observableArray";
    export class ObservableArrayBase<T> extends ObservableWritableBase<T[]> implements ObservableArray<T> {
        constructor(defaultValue?: T[]);
        add(element: T): void;
        remove(element: T): boolean;
    }
}
declare module "src/entities/validationError" {
    export class ValidationError {
        readonly message: string;
        constructor(message: string);
    }
}
declare module "src/enums/icons" {
    export enum Icon {
        pencilSquare = "i-heroicons-pencil-square",
        trash = "i-heroicons-trash",
        plus = "i-heroicons-plus",
        check = "i-heroicons-check",
        xMark = "i-heroicons-x-mark",
        heart = "i-heroicons-heart",
        star = "i-heroicons-star",
        cog = "i-heroicons-cog",
        bellInactive = "i-heroicons-bell",
        bellActive = "i-heroicons-bell-solid",
        home = "i-heroicons-home",
        questionMarkCircle = "i-heroicons-question-mark-circle",
        exclamationTriangle = "i-heroicons-exclamation-triangle"
    }
}
declare module "src/exceptions/handlerAlreadySetException" {
    export class HandlerAlreadySetException extends Error {
        constructor();
    }
}
declare module "src/exceptions/initializationOnlyException" {
    export class InitializationOnlyException extends Error {
        constructor(propertyName: string);
    }
}
declare module "src/exceptions/notFoundException" {
    export class NotFoundException extends Error {
    }
}
declare module "src/exceptions/readonlyRefValueChangeException" {
    export class ReadonlyRefValueChangeException extends Error {
        constructor();
    }
}
declare module "src/exceptions/unknownErrorException" {
    export class UnknownErrorException extends Error {
        constructor(message?: string);
    }
}
declare module "src/interfaces/valueMapper" {
    export abstract class ValueMapper<I, O> {
        abstract map(value: I): O;
        abstract mapReverse(value: O): I;
    }
}
declare module "src/mappers/optionalValueMapper" {
    import { ValueMapper } from "src/interfaces/valueMapper";
    export class OptionalValueMapper<I, O> extends ValueMapper<I | undefined, O | undefined> {
        private valueMapper;
        constructor(valueMapper: ValueMapper<I, O>);
        map(value: I | undefined): O | undefined;
        mapReverse(value: O | undefined): I | undefined;
    }
}
declare module "src/mappers/timeMapper" {
    import type { Time } from "@internationalized/date";
    import { ValueMapper } from "src/interfaces/valueMapper";
    export abstract class TimeMapper extends ValueMapper<number, Time> {
    }
}
declare module "src/mappers/timeMapperImpl" {
    import { Time } from "@internationalized/date";
    import { ValueMapper } from "src/interfaces/valueMapper";
    export class TimeMapperImpl extends ValueMapper<number, Time> {
        map(value: number): Time;
        mapReverse(time: Time): number;
    }
}
declare module "src/mappers/zonedDateTimeMapper" {
    import type { ZonedDateTime } from "@internationalized/date";
    import { ValueMapper } from "src/interfaces/valueMapper";
    export abstract class ZonedDateTimeMapper extends ValueMapper<Date, ZonedDateTime> {
    }
}
declare module "src/mappers/zonedDateTimeMapperImpl" {
    import { type ZonedDateTime } from "@internationalized/date";
    import { ZonedDateTimeMapper } from "src/mappers/zonedDateTimeMapper";
    export class ZonedDateTimeMapperImpl extends ZonedDateTimeMapper {
        map(value: Date): ZonedDateTime;
        mapReverse(datetime: ZonedDateTime): Date;
    }
}
declare module "src/services/loggingService" {
    export abstract class LoggingService {
        abstract logError(error: unknown): void;
    }
}
declare module "src/utils/isString" {
    export function isString(value: unknown): value is string;
}
declare module "src/services/loggingServiceImpl" {
    import { LoggingService } from "src/services/loggingService";
    export class LoggingServiceImpl extends LoggingService {
        private logger;
        logError(error: unknown): void;
        private createLogger;
    }
}
declare module "src/services/messagesService" {
    export abstract class MessagesService {
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
         * Fallback overload for dynamic keys (used internally by the implementation).
         * @param key - The message key
         * @param params - Optional interpolation parameters
         */
        abstract getMessage(key: string, params?: Record<string, string | number>): string;
    }
}
declare module "src/services/messagesServiceImpl" {
    import type { Func } from "src/types/func";
    import { MessagesService } from "src/services/messagesService";
    export class MessagesServiceImpl extends MessagesService {
        private t;
        constructor(t: Func<string, [key: string, params?: Record<string, string | number>]>);
        getMessage(key: string, params?: Record<string, string | number>): string;
    }
}
declare module "src/types/abstractConstructor" {
    export type AbstractConstructor<T> = abstract new (...args: any[]) => T;
}
declare module "src/types/constructor" {
    export type Constructor<T, TArgs extends any[] = any[]> = new (...args: TArgs) => T;
}
declare module "src/types/stateTransition" {
    export type StateTransition<TState extends Record<string, any>, TConstraint extends Record<string, any>> = {
        from: TState;
        to: TState;
        constraint: TConstraint;
    };
}
declare module "src/utils/awaitMicrotasks" {
    export function awaitMicrotasks(): Promise<void>;
}
declare module "src/utils/clearArray" {
    export function clearArray<T>(array: T[]): void;
}
declare module "src/utils/delay" {
    export function delay(ms: number): Promise<void>;
}
declare module "src/utils/getTime" {
    export function getTime(date: Date): number;
}
declare module "src/utils/getUniqueId" {
    export function getUniqueId(prefix?: string): string;
}
declare module "src/utils/isArray" {
    export function isArray(value: any): value is Array<any>;
}
declare module "src/utils/isDate" {
    export function isDate(value: any): value is Date;
}
declare module "src/utils/isDisposable" {
    /**
     * Checks if an object implements the Disposable interface (has [Symbol.dispose] method).
     * @param obj - The object to check
     * @returns True if the object is Disposable
     */
    export function isDisposable(obj: unknown): obj is Disposable;
}
declare module "src/utils/isFunction" {
    export function isFunction(value: any): value is Function;
}
declare module "src/utils/isObject" {
    /**
     * Checks if a value is a plain object (not an array, not null, constructor is Object).
     * @param value - The value to check
     * @returns True if the value is a plain object, false otherwise
     */
    export function isObject(value: unknown): value is Record<string, unknown>;
}
declare module "src/utils/isStringEmpty" {
    export function isStringEmpty(str: string | null | undefined): boolean;
}
declare module "src/utils/mapObject" {
    export function mapObject<TInput extends Record<string, any>, TOutput>(obj: TInput, mapFn: (value: TInput[keyof TInput], key: keyof TInput) => TOutput | undefined, omitUndefined?: boolean): Record<keyof TInput, TOutput>;
}
declare module "src/utils/mergeDeep" {
    export function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): T;
}
declare module "src/utils/once" {
    import type { Action } from "src/types/action";
    export function once(fn: Action<[]>): Action<[]>;
}
declare module "src/utils/postfixNotEmptyString" {
    export function postfixNotEmptyString(str: string | undefined, postfix: string, separator?: string): string | undefined;
    export function postfixNotEmptyString(str: string, postfix: string, separator?: string): string;
}
declare module "src/utils/satisfies" {
    export function satisfies<TConstraint extends Record<string, any>>(target: Record<string, any>, constraint: TConstraint): boolean;
}
declare module "src/utils/setTime" {
    export function setTime(date: Date, milliseconds: number): Date;
}
declare module "src/utils/updatePropertiesWithData" {
    export function updatePropertiesWithData(object: object, data: Record<string, any>): void;
}
declare module "src/index" {
    export { secondInMilliseconds, minuteInMilliseconds, hourInMilliseconds, dayInMilliseconds } from "src/constants/dateConstants";
    export { AsyncCommand } from "src/entities/asyncCommand";
    export { AsyncCommandBase } from "src/entities/asyncCommandBase";
    export { DisposeToken } from "src/entities/disposeToken";
    export { EntityEvent, type EntityEventConfiguration } from "src/entities/entityEvent";
    export { InitializationToken } from "src/entities/initializationToken";
    export { type ObservableArray } from "src/entities/observableArray";
    export { ObservableArrayBase } from "src/entities/observableArrayBase";
    export { type ObservableReadonly, isObservable } from "src/entities/observableReadonly";
    export { type ObservableWritable } from "src/entities/observableWritable";
    export { ObservableWritableBase } from "src/entities/observableWritableBase";
    export { ValidationError } from "src/entities/validationError";
    export { CommandState } from "src/enums/commandState";
    export { Icon } from "src/enums/icons";
    export { DisposedException } from "src/exceptions/disposedException";
    export { HandlerAlreadySetException } from "src/exceptions/handlerAlreadySetException";
    export { InitializationOnlyException } from "src/exceptions/initializationOnlyException";
    export { InitializedException } from "src/exceptions/initializedException";
    export { NotFoundException } from "src/exceptions/notFoundException";
    export { NotInitializedException } from "src/exceptions/notInitializedException";
    export { ReadonlyRefValueChangeException } from "src/exceptions/readonlyRefValueChangeException";
    export { UnknownErrorException } from "src/exceptions/unknownErrorException";
    export type { Subscribable } from "src/interfaces/subscribable";
    export { ValueMapper } from "src/interfaces/valueMapper";
    export { OptionalValueMapper } from "src/mappers/optionalValueMapper";
    export { TimeMapper } from "src/mappers/timeMapper";
    export { TimeMapperImpl } from "src/mappers/timeMapperImpl";
    export { ZonedDateTimeMapper } from "src/mappers/zonedDateTimeMapper";
    export { ZonedDateTimeMapperImpl } from "src/mappers/zonedDateTimeMapperImpl";
    export { LoggingService } from "src/services/loggingService";
    export { LoggingServiceImpl } from "src/services/loggingServiceImpl";
    export { MessagesService } from "src/services/messagesService";
    export { MessagesServiceImpl } from "src/services/messagesServiceImpl";
    export type { AbstractConstructor } from "src/types/abstractConstructor";
    export type { Action } from "src/types/action";
    export type { Constructor } from "src/types/constructor";
    export type { Func } from "src/types/func";
    export type { StateTransition } from "src/types/stateTransition";
    export { awaitMicrotasks } from "src/utils/awaitMicrotasks";
    export { clearArray } from "src/utils/clearArray";
    export { delay } from "src/utils/delay";
    export { getTime } from "src/utils/getTime";
    export { getUniqueId } from "src/utils/getUniqueId";
    export { isArray } from "src/utils/isArray";
    export { isDate } from "src/utils/isDate";
    export { isDisposable } from "src/utils/isDisposable";
    export { isFunction } from "src/utils/isFunction";
    export { isObject } from "src/utils/isObject";
    export { isString } from "src/utils/isString";
    export { isStringEmpty } from "src/utils/isStringEmpty";
    export { mapObject } from "src/utils/mapObject";
    export { mergeDeep } from "src/utils/mergeDeep";
    export { once } from "src/utils/once";
    export { postfixNotEmptyString } from "src/utils/postfixNotEmptyString";
    export { removeFromArray } from "src/utils/removeFromArray";
    export { satisfies } from "src/utils/satisfies";
    export { setTime } from "src/utils/setTime";
    export { updatePropertiesWithData } from "src/utils/updatePropertiesWithData";
}
declare module "src/mocks/messagesServiceMock" {
    export const messagesServiceMock: {
        getMessage: import("vitest").Mock<(...args: any[]) => any>;
    };
}
declare module "src/mocks/observableReadonlyMock" {
    export function createObservableReadonlyMock<T>(value: T): {
        readonly value: T;
        on: import("vitest").Mock<(...args: any[]) => any>;
        [Symbol.dispose]: import("vitest").Mock<(...args: any[]) => any>;
    };
}
declare module "src/mocks/index" {
    export { messagesServiceMock } from "src/mocks/messagesServiceMock";
    export { createObservableReadonlyMock } from "src/mocks/observableReadonlyMock";
}
declare module "src/test/unit/asyncCommandBase.test" { }
declare module "src/test/unit/disposeToken.test" { }
declare module "src/test/unit/event.test" { }
declare module "src/test/unit/getTime.test" { }
declare module "src/test/unit/isDate.test" { }
declare module "src/test/unit/isObject.test" { }
declare module "src/test/unit/isStringEmpty.test" { }
declare module "src/test/unit/once.test" { }
declare module "src/test/unit/postfixNotEmptyString.test" { }
declare module "src/test/unit/setTime.test" { }
declare module "test/unit/asyncCommandBase.test" { }
declare module "test/unit/disposeToken.test" { }
declare module "test/unit/event.test" { }
declare module "test/unit/getTime.test" { }
declare module "test/unit/isDate.test" { }
declare module "test/unit/isObject.test" { }
declare module "test/unit/isStringEmpty.test" { }
declare module "test/unit/once.test" { }
declare module "test/unit/postfixNotEmptyString.test" { }
declare module "test/unit/setTime.test" { }
