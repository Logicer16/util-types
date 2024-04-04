/**
 * @file Testing types related to the use of unions and intersections.
 */
import {UnionToIntersection} from "../types/unionsAndIntersections.js";

type A = {one: 1};
type B = {two: 2};
type C = {three: 3};

type Union = A | B | C;

type Intersection = UnionToIntersection<Union>;
const common: Intersection = {one: 1, three: 3, two: 2};
type AnyIntersectionA = A extends Intersection ? true : false;
const anyIntersectionA: AnyIntersectionA = false;
type AnyIntersectionB = B extends Intersection ? true : false;
const anyIntersectionB: AnyIntersectionB = false;
type AnyIntersectionC = C extends Intersection ? true : false;
const anyIntersectionC: AnyIntersectionC = false;
