/**
 * @file Utility Types.
 */
import type {Add, Compare, Subtract} from "@logicer/ts-arithmetic";

export namespace Unsafe {
  type Enumerate<
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

  type BigEnumerate<
    End extends number,
    Start extends number = 0,
    Fallback = number,
    // This is due to typescript limitations (cumulative type instantiation).
    DepthRemaining extends number = 120,
    Accumulator extends number[] = [],
    ExpectedLength extends number = Subtract<End, Start>,
    NewStart extends number = Add<Start, DepthRemaining>
  > = ExpectedLength extends Accumulator["length"]
    ? Accumulator[number]
    : DepthRemaining extends 0
      ? Fallback
      : BigEnumerate<
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
 * Inclusive of `Start`; Exclusive of `End`.
 *
 * The maximum number of union items is 7260 due to typescript limitations (cumulative type instantiation). If the range exceeds this limit, it will default to `number`.
 */
export type IntRange<
  Start extends number,
  End extends number,
  Fallback = number
> = Unsafe.BigEnumerate<End, Start, Fallback>;
