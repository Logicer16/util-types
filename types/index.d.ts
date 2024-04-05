/**
 * @file The module's exports.
 */
/* eslint-disable import/export */

/**
 * WARNING! Contains internal types used to produces the types exported by this package. These types are unsupported and may change at any time. USE AT YOUR OWN RISK.
 */
export namespace Unsafe {
  export type {Unsafe as UnionMax} from "./UnionMax.d.ts";
  export type {Unsafe as IntRange} from "./IntRange.d.ts";
  /**
   * From [`@logicer/ts-arithmetic`](https://www.npmjs.com/package/@logicer/ts-arithmetic).
   */
  export type {Unsafe as Arithmetic} from "@logicer/ts-arithmetic";
}

export * from "./any.d.ts";
export * from "./UnionMax.d.ts";
export * from "./IntRange.d.ts";
export * from "./unionsAndIntersections.d.ts";
export * from "@logicer/ts-arithmetic";
