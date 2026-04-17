export {}
declare global
{
  export type { AppPublicRuntimeConfig } from './app/interfaces/appRuntimeConfig';
  export type { DatesService } from './app/interfaces/datesService';
  export type { StringsService } from './app/interfaces/stringsService';
  export type { SSRLoader } from './app/interfaces/ssrLoader';
  export type { ValueMapper } from './app/interfaces/valueMapper';
  export type { TimeMapper } from './app/interfaces/timeMapper';
  export type { ZonedDateTimeMapper } from './app/interfaces/zonedDateTimeMapper';
  export type { Observable } from './app/interfaces/observable';
  export type { ObservableWritable } from './app/interfaces/observableWritable';
  export type { Subscribable } from './app/interfaces/subscribable';
  export type { Destroyable } from './app/interfaces/destroyable';
}