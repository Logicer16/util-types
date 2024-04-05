/**
 * @file Generate a union of a range of numeric literals.
 */
import type {Add, Compare, Subtract} from "@logicer/ts-arithmetic";

export namespace Unsafe {
  /**
   * Recursively enumerate over a given range, producing an array consisting of numeric literals of the numbers within that range.
   * @param End The value at which the range terminates (exclusive).
   * @param Start The value at which the range begins (inclusive).
   * @param Accumulator The array to add values to.
   * @returns {number[]} The modified `Accumulator`.
   */
  export type Enumerate<
    End extends number,
    Start extends number = 0,
    Accumulator extends number[] = []
  > =
    Accumulator["length"] extends Subtract<End, Start>
      ? Accumulator
      : Enumerate<
          End,
          Start,
          [...Accumulator, Add<Accumulator["length"], Start>]
        >;

  /**
   * Recursively use a type to enumerate over a given range, producing union whose constituents are the numeric literals of the numbers within that range.
   * @param End The value at which the range terminates (exclusive).
   * @param Start The value at which the range begins (inclusive).
   * @param Fallback The type to return when the depth is exhausted.
   * @param DepthRemaining The remaining recursion depth available for types.
   * @param Accumulator The array to add values to.
   * @param ExpectedLength The computed length the accumulator is expected to be once the entire range has been enumerated.
   * @param NewStart The computed start value of subsequent recursions.
   * @returns {number} The modified `Accumulator`.
   */
  export type RecursivelyEnumerate<
    End extends number,
    Start extends number = 0,
    Fallback = number,
    DepthRemaining extends number = 1000,
    Accumulator extends number[] = [],
    ExpectedLength extends number = Subtract<End, Start>,
    NewStart extends number = Add<Start, DepthRemaining>
  > = ExpectedLength extends Accumulator["length"]
    ? Accumulator[number]
    : DepthRemaining extends 0
      ? Fallback
      : RecursivelyEnumerate<
          End,
          NewStart,
          Fallback,
          Subtract<DepthRemaining, 1>,
          // @ts-expect-error: TS2321 Flawed typechecking due to recursion causes false positive citing uncertainty.
          [
            ...Accumulator,
            ...Enumerate<
              // Who said you'd never end up using high school algebra in the real world.
              // Equivalent to `Gt<Subtract<End, Start>, DepthRemaining>`.
              Compare<End, NewStart> extends 1 ? NewStart : End,
              Start
            >
          ],
          ExpectedLength
        >;
}

// Max value is the (DepthRemaining + 1)th triangle number.
/**
 * Generate a union of number literals within a specified range.
 *
 * If start is greater than end, `number` will be returned.
 *
 * The maximum number of union items is 7260 due to other [typescript limitations](https://github.com/Logicer16/util-types?tab=readme-ov-file#limitations). If the range exceeds this limit, `number` will be returned instead.
 * @param Start The start value of the range produced (inclusive).
 * @param End The end value of the range produced (exclusive).
 * @returns {number} A union of number literals within the specified range.
 */
export type IntRange<
  Start extends number,
  End extends number
  // Limited depth due to typescript limitations (cumulative type instantiation).
> = Unsafe.RecursivelyEnumerate<End, Start, number, 120>;
