/**
 * @file Find the greatest numeric literal in a union.
 */
import type {Add, Subtract} from "@logicer/ts-arithmetic";
import type {UnionToIntersection} from "./unionsAndIntersections.d.ts";

export namespace Unsafe {
  /**
   * An object representing the result of the UnionMaxConsume operation.
   */
  export interface UnionMaxConsumeResult {
    /**
     * True if the operation has completed consuming the input union. Otherwise, false.
     */
    done: boolean;

    /**
     * The constituent of the input union with the greatest value if the operation has completed. Otherwise, this is the remaining unprocessed subset of the union.
     */
    value: number;
  }

  /**
   * Iteratively remove constituent numeric literals from a union until a single value remains.
   * @param Value The input union to process.
   * @param End The maximum value to remove from the union before returning.
   * @param Index The current value being removed from the union.
   * @param Result The computed result of excluding `Index` from the `Value` union.
   * @returns {Unsafe.UnionMaxConsumeResult} An object representing the result of the operation.
   */
  export type UnionMaxConsume<
    Value extends number,
    End extends number,
    Index extends number = 0,
    Result extends number = Exclude<Value, Index>
  > = [UnionToIntersection<Value>] extends [never]
    ? Index extends End
      ? {done: false; value: Result}
      : UnionMaxConsume<Result, End, Add<Index, 1>>
    : {done: true; value: Value};

  /**
   * Iteratively use a type to iteratively remove constituent numeric literals from a union until a single value remains.
   * @param Value The input union to process.
   * @param Index The current start value to remove from the union.
   * @param Fallback The type to return when the depth is exhausted.
   * @param DepthRemaining The remaining recursion depth available for types.
   * @param NewIndex The computed index of the subsequence iterations.
   * @param Result The computed result of this iteration's consumption.
   * @returns {number | Fallback} The constituent of the input union with the greatest value. If the depth is exhausted, `Fallback` is returned instead. If the operation was unsuccessful, number is returned instead.
   */
  export type BigUnionMaxConsume<
    Value extends number,
    Index extends number = 0,
    Fallback = number,
    // This is due to typescript limitations (cumulative type instantiation).
    DepthRemaining extends number = 112,
    NewIndex extends number = Add<Index, DepthRemaining>,
    Result extends {done: boolean; value: number} = UnionMaxConsume<
      Value,
      NewIndex,
      Index
    >
  > = Result["done"] extends true
    ? Result["value"]
    : DepthRemaining extends 0
      ? Fallback
      : BigUnionMaxConsume<
          Result["value"],
          NewIndex,
          Fallback,
          Subtract<DepthRemaining, 1>
        >;
}

// Max value is the (DepthRemaining - 1)th triangle number.
/**
 * Find the greatest number in a union.
 *
 * The maximum search range is 6328 due to other [typescript limitations](https://github.com/Logicer16/util-types?tab=readme-ov-file#limitations). If the range exceeds this limit, `number` will be returned instead.
 * @param In A union of numeric literals to search.
 * @param Start Searches from `Start` (inclusive) incrementally until the greatest value is reached. If this.
 * @returns {number} A numeric literal representing the greatest value in a union. If the parameters are outside the capabilities of the type, `number` will be returned instead.
 */
export type UnionMax<
  In extends number,
  Start extends number = 0
> = Unsafe.BigUnionMaxConsume<In, Start>;
