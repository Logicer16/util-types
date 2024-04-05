/**
 * @file Testing types related to the use of `any`.
 */
import type {IsAny} from "../types/any.js";

interface InterfaceWithContents {
  // type-coverage:ignore-next-line
  one: any;
}

interface EmptyInterface {}

const any: IsAny<any> = true;
const unknown: IsAny<unknown> = false;
const primitive: IsAny<number> = false;
const interfaceWithContents: IsAny<InterfaceWithContents> = false;
const emptyInterface: IsAny<EmptyInterface> = false;
const objectA: IsAny<object> = false;
/* eslint-disable @typescript-eslint/ban-types */
// type-coverage:ignore-next-line
const objectB: IsAny<Object> = false;
/* eslint-enable @typescript-eslint/ban-types */
const literal: IsAny<1> = false;
