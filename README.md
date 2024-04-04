# Logicer's ESLint Base Configuration

[![npm (scoped)](https://img.shields.io/npm/v/%40logicer/util-types)](https://www.npmjs.com/package/@logicer/util-types)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Logicer16/util-types/style.yml)](https://github.com/Logicer16/util-types/actions)
[![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/Logicer16/util-types)](https://github.com/Logicer16/util-types/graphs/contributors)
[![Type Coverage](https://img.shields.io/badge/dynamic/json.svg?label=type%20coverage&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2FLogicer16%2Futil-types%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)

A set of custom utility types to help supplement those provided by typescript.

Contents:

- [Install](#install)
- [Exports](#exports)
  - [IntRange](#intrange)
  - [UnionMax](#unionmax)
  - [Arithmetic](#arithmetic)
  - [Unsafe](#unsafe)
- [Limitations](#limitations)

## Install

```sh
npm install --save-dev typescript @logicer/util-types
```

## Exports

### IntRange

Generate a union of numbers within a certain range. Accepts a start to the range (inclusive) and an end to the range (exclusive). If start is greater than end, `number` will be returned.

The number of items in the resulting union is limited to 7260 due to other [typescript limitations](#limitations). If the range exceeds this limit, `number` will be returned instead.

```ts
import type {IntRange} from "@logicer/util-types";

// 1 | 2 | 3 | 4 | 5
type Numbers = IntRange<1, 6>;

// 1 | 2 | 3 | 4 | ... | 47 | 48 | 49 | 50
type BigNumbers = IntRange<1, 51>;

// 1 | 2 | 3 | 4 | ... | 497 | 498 | 499 | 500
type BiggerNumbers = IntRange<1, 501>;

// Exceeds typescript's usual depth limit of 1000 in types
// 1 | 2 | 3 | 4 | ... | 4997 | 4998 | 4999 | 5000
type BiggestNumbers = IntRange<1, 5001>;

// Can be any number as long as it doesn't exceed the item count limit
// 9001 | 9002 | 9003 | 9004 | ... | 9997 | 9998 | 9999 | 10000
type OverNineThousand = IntRange<9001, 10000>;
```

### UnionMax

Find the greatest number in a union of numeric type literals. Accepts a union of numeric type literal and lower bound to begin searching at (inclusive). If the lower bound is greater than the lowest value in the union, `number` will be returned.

The number of items to search is limited to 6328 due to other [typescript limitations](#limitations). If the largest value is not found before this limit is reached, `number` will be returned instead.

```ts
import type {UnionMax} from "@logicer/util-types";

// 5
type NumbersMax = UnionMax<1 | 2 | 3 | 4 | 5>;

// 50
type BigNumbersMax = UnionMax<10 | 20 | 30 | 40 | 50>;

// 500
type BiggerNumbersMax = UnionMax<100 | 200 | 300 | 400 | 500>;

// Exceeds typescript's usual depth limit of 1000 in types
// 5000
type BiggestNumbersMax = UnionMax<1000 | 2000 | 3000 | 4000 | 5000>;

// Can be any number as long as it doesn't exceed the item count limit
// 9050
type OverNineThousandMax = UnionMax<9010 | 9020 | 9030 | 9040 | 9050, 9000>;

// Returns as soon as the greatest value is found.
// Hence prevents hitting the search limit.
// 1000000
type EarlyExit = UnionMax<1 | 1000000>;
```

### Arithmetic

Re-exports the types from [`ts-arithmetic`](https://github.com/Logicer16/ts-arithmetic)

### Unsafe

> [!WARNING]
> Unsafe contains internal types used to produces the types exported by this package. Use at your own risk.

## Limitations

Typescript has a [5 million total type instantiation limit](https://github.com/microsoft/TypeScript/pull/32079/files) when resolving each type. This is the sum of the instances included in a definition of a type and those needed to resolve any parameters. This means that if even though a type is under this limit if used alone, it may exceed this limit if used with other types. For example:

```ts
import type {UnionMax, IntRange} from "@logicer/util-types";

// Works without error
type range = IntRange<0, 6000>;
// Note: must iterate from 0 to 6000
type max = UnionMax<5999 | 6000>;

// Typescript throws TS2589: Type instantiation is excessively deep and possibly infinite.
type instanceLimited = UnionMax<range>;
```
