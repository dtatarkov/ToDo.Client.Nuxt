import type { VComponentRenderFunction } from "./vcomponentRenderFunction";

export type VComponent = {
  setup(): VComponentRenderFunction
}