/**
 * @file Utility Types.
 */
import type {Add, Compare, Subtract} from "@logicer/ts-arithmetic";
import type {UnionToIntersection} from "./combinations.js";

export namespace Unsafe {
  type UnionMaxConsume<
    Value extends number,
    End extends number,
    Index extends number = 0,
    Fallback = number,
    Result extends number = Exclude<Value, Index>
  > = [UnionToIntersection<Value>] extends [never]
    ? Index extends End
      ? {done: false; value: Result}
      : UnionMaxConsume<Result, End, Add<Index, 1>, Fallback>
    : {done: true; value: Value};

  type BigUnionMaxConsume<
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
 * Searches from `Start` (inclusive) incrementally until the greatest value is reached.
 *
 * The maximum search range is 6328 due to typescript limitations (cumulative type instantiation). If the range exceeds this limit, it will default to `number`.
 */
export type UnionMax<
  In extends number,
  Start extends number = 0
> = Unsafe.BigUnionMaxConsume<In, Start>;
