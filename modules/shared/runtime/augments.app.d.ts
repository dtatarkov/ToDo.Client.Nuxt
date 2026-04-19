import { AppPublicRuntimeConfig as AppPublicRuntimeConfigImport } from './app/interfaces/appPublicRuntimeConfig';
import { DataAdapterFactory as DataAdapterFactoryImport } from './app/interfaces/dataAdapterFactory';
import { DatesService as DatesServiceImport } from './app/interfaces/datesService';
import { Destroyable as DestroyableImport } from './app/interfaces/destroyable';
import { LazyEntity as LazyEntityImport } from './app/interfaces/lazyEntity';
import { LazyEntityBase as LazyEntityBaseImport } from './app/entities/lazyEntityBase';
import { EventBus as EventBusImport } from './app/interfaces/eventBus';
import { Observable as ObservableImport } from './app/interfaces/observable';
import { ObservableWritable as ObservableWritableImport } from './app/interfaces/observableWritable';
import { SSRLoader as SSRLoaderImport } from './app/interfaces/ssrLoader';
import { StringsService as StringsServiceImport } from './app/interfaces/stringsService';
import { Subscribable as SubscribableImport } from './app/interfaces/subscribable';
import { TimeMapper as TimeMapperImport } from './app/interfaces/timeMapper';
import { ValueMapper as ValueMapperImport } from './app/interfaces/valueMapper';
import { VueComponentPropsFactory as VueComponentPropsFactoryImport } from './app/interfaces/vueComponentPropsFactory';
import { ZonedDateTimeMapper as ZonedDateTimeMapperImport } from './app/interfaces/zonedDateTimeMapper';

export { };

declare global
{
  export type AppPublicRuntimeConfig = AppPublicRuntimeConfigImport;
  export type DataAdapterFactory = DataAdapterFactoryImport;
  export type DatesService = DatesServiceImport;
  export type Destroyable = DestroyableImport;
  export type LazyEntity<T> = LazyEntityImport<T>;
  export type LazyEntityBase<T> = LazyEntityBaseImport<T>;
  export type EventBus = EventBusImport;
  export type Observable<T> = ObservableImport<T>;
  export type ObservableWritable<T> = ObservableWritableImport<T>;
  export type SSRLoader = SSRLoaderImport;
  export type StringsService = StringsServiceImport;
  export type Subscribable<T = void> = SubscribableImport<T>;
  export type TimeMapper = TimeMapperImport;
  export type ValueMapper<I, O> = ValueMapperImport<I, O>;
  export type VueComponentPropsFactory = VueComponentPropsFactoryImport;
  export type ZonedDateTimeMapper = ZonedDateTimeMapperImport;
}