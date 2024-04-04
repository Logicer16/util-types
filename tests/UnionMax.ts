import type {UnionMax, IntRange} from "@logicer/util-types";
import {type} from "os";

// Bounds:

type MaxRangedResult = UnionMax<6327 | 6328>;
const valid: MaxRangedResult = 6328;
// @ts-expect-error
const oneOverAny: MaxRangedResult = 10;

// Documentation Examples:

type NumbersMax = UnionMax<1 | 2 | 3 | 4 | 5>;
const numbersMaxA: NumbersMax = 5;
// @ts-expect-error TS2322
const numbersMaxB: NumbersMax = 1;
// @ts-expect-error TS2322
const numbersMaxC: NumbersMax = 2;
// @ts-expect-error TS2322
const numbersMaxD: NumbersMax = 3;
// @ts-expect-error TS2322
const numbersMaxE: NumbersMax = 4;
type AnyNumbersMax = number extends NumbersMax ? true : false;
const anyNumberMax: AnyNumbersMax = false;

type BigNumbersMax = UnionMax<10 | 20 | 30 | 40 | 50>;
const bigNumbersMaxA: BigNumbersMax = 50;
// @ts-expect-error TS2322
const bigNumbersMaxB: BigNumbersMax = 10;
// @ts-expect-error TS2322
const bigNumbersMaxC: BigNumbersMax = 20;
// @ts-expect-error TS2322
const bigNumbersMaxD: BigNumbersMax = 30;
// @ts-expect-error TS2322
const bigNumbersMaxE: BigNumbersMax = 40;
type AnyBigNumbersMax = number extends BigNumbersMax ? true : false;
const anyBigNumberMax: AnyBigNumbersMax = false;

type BiggerNumbersMax = UnionMax<100 | 200 | 300 | 400 | 500>;
const biggerNumbersMaxA: BiggerNumbersMax = 500;
// @ts-expect-error TS2322
const biggerNumbersMaxB: BiggerNumbersMax = 100;
// @ts-expect-error TS2322
const biggerNumbersMaxC: BiggerNumbersMax = 200;
// @ts-expect-error TS2322
const biggerNumbersMaxD: BiggerNumbersMax = 300;
// @ts-expect-error TS2322
const biggerNumbersMaxE: BiggerNumbersMax = 400;
type AnyBiggerNumbersMax = number extends BiggerNumbersMax ? true : false;
const anyBiggerNumberMax: AnyBiggerNumbersMax = false;

type BiggestNumbersMax = UnionMax<1000 | 2000 | 3000 | 4000 | 5000>;
const biggestNumbersMaxA: BiggestNumbersMax = 5000;
// @ts-expect-error TS2322
const biggestNumbersMaxB: BiggestNumbersMax = 1000;
// @ts-expect-error TS2322
const biggestNumbersMaxC: BiggestNumbersMax = 2000;
// @ts-expect-error TS2322
const biggestNumbersMaxD: BiggestNumbersMax = 3000;
// @ts-expect-error TS2322
const biggestNumbersMaxE: BiggestNumbersMax = 4000;
type AnyBiggestNumbersMax = number extends BiggestNumbersMax ? true : false;
const anyBiggestNumberMax: AnyBiggestNumbersMax = false;

type OverNineThousandMax = UnionMax<9010 | 9020 | 9030 | 9040 | 9050, 9000>;
const overNineThousandMaxA: OverNineThousandMax = 9050;
// @ts-expect-error TS2322
const overNineThousandMaxB: OverNineThousandMax = 9010;
// @ts-expect-error TS2322
const overNineThousandMaxC: OverNineThousandMax = 9020;
// @ts-expect-error TS2322
const overNineThousandMaxD: OverNineThousandMax = 9030;
// @ts-expect-error TS2322
const overNineThousandMaxE: OverNineThousandMax = 9040;
type AnyOverNineThousandMax = number extends OverNineThousandMax ? true : false;
const anyOverNineThousandMax: AnyOverNineThousandMax = false;

type EarlyExit = UnionMax<1 | 1000000>;
type AnyEarlyExit = number extends EarlyExit ? true : false;
const anyEarlyExit: AnyEarlyExit = false;
