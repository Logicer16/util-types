import type {IntRange} from "@logicer/util-types";

// Bounds:

type MaxRange = IntRange<0, 7260>;
const valid: MaxRange[] = [0, 7259];
// @ts-expect-error
const oneOverAny: MaxRange = 7260;

// Documentation Examples:

type Numbers = IntRange<1, 6>;
const numbersA: Numbers[] = [1, 2, 3, 4, 5];
//@ts-expect-error TS2322
const numbersB: Numbers = 0;
// @ts-expect-error TS2322
const numbersC: Numbers = 6;
type AnyNumbers = number extends Numbers ? true : false;
const anyNumber: AnyNumbers = false;

type BigNumbers = IntRange<1, 51>;
const bigNumbersA: BigNumbers[] = [10, 20, 30, 40, 50];
// @ts-expect-error TS2322
const bigNumbersB: Numbers = 0;
// @ts-expect-error TS2322
const bigNumbersC: Numbers = 51;
type AnyBigNumbers = number extends BigNumbers ? true : false;
const anyBigNumber: AnyBigNumbers = false;

type BiggerNumbers = IntRange<1, 501>;
const biggerNumbersA: BiggerNumbers[] = [100, 200, 300, 400, 500];
// @ts-expect-error TS2322
const biggerNumbersB: Numbers = 0;
// @ts-expect-error TS2322
const biggerNumbersC: Numbers = 501;
type AnyBiggerNumbers = number extends BiggerNumbers ? true : false;
const anyBiggerNumber: AnyBiggerNumbers = false;

type BiggestNumbers = IntRange<1, 5001>;
const biggestNumbersA: BiggestNumbers[] = [1000, 2000, 3000, 4000, 5000];
// @ts-expect-error TS2322
const biggestNumbersB: Numbers = 0;
// @ts-expect-error TS2322
const biggestNumbersC: Numbers = 5001;
type AnyBiggestNumbers = number extends BiggestNumbers ? true : false;
const anyBiggestNumber: AnyBiggestNumbers = false;

type OverNineThousand = IntRange<9001, 10000>;
const overNineThousandA: OverNineThousand[] = [
  9001, 9200, 9400, 9600, 9800, 9999
];
// @ts-expect-error TS2322
const overNineThousandB: OverNineThousand = 9000;
// @ts-expect-error TS2322
const overNineThousandC: OverNineThousand = 10000;
type AnyOverNineThousand = number extends OverNineThousand ? true : false;
const anyOverNineThousand: AnyOverNineThousand = false;
