import { Viewmodel } from './viewmodel';

/**
 * Viewmodel extension required for dynamic component resolution.
 *
 * A VM whose state is rendered by a UI layer (Vue/React/…) must extend this
 * class and define a unique `renderKey` symbol. The UI layer keeps a mapping
 * `renderKey -> component` (e.g. a `switch` in a Vue component) and resolves
 * the correct component at render time — instead of coupling the VM state to
 * a specific framework component.
 *
 * Concrete VMs must:
 * 1. declare `static renderKey: symbol = Symbol('...')` on the class;
 * 2. return it from the instance `get renderKey()` getter.
 *
 * The same `renderKey` value (Symbol equality) is used in both the static
 * declaration and the instance getter, so `FormViewmodel.renderKey` in the
 * Vue layer matches `content.renderKey` coming from the VM state.
 */
export abstract class RenderableViewmodel<TData extends Record<string, any> = Record<string, any>>
    extends Viewmodel<TData>
{
    abstract get renderKey(): symbol;
}
