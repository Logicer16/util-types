import type {UnionMax, IntRange} from "@logicer/util-types";

// Documentation Examples:

type range = IntRange<0, 6000>;
type max = UnionMax<5999 | 6000>;

// @ts-expect-error: TS2589
type instanceLimited = UnionMax<range>;
