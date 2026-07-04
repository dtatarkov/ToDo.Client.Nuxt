import type { Constructor } from "./constructor";
import type { AbstractConstructor } from "./abstractConstructor";

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;