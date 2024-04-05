/**
 * @file Testing the interactions of between types in the package.
 */

import type {IntRange} from "../types/IntRange.js";
import type {UnionMax} from "../types/UnionMax.js";

// Documentation Examples:

type range = IntRange<0, 6000>;
type max = UnionMax<5999 | 6000>;

// @ts-expect-error: TS2589
type instanceLimited = UnionMax<range>;
