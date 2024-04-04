/**
 * @file Types related to the use of unions and intersections.
 */

/**
 * Creates an intersection from a union's constituent types.
 * @param Union The union to convert to an intersection.
 * @returns An intersection whose constituent types match those of the input union.
 * @see https://stackoverflow.com/a/50375286
 */
export type UnionToIntersection<Union> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Union extends any ? (x: Union) => void : never) extends (
    x: infer Intersection
  ) => void
    ? Intersection
    : never;

/**
 * Returns a true if a type is a union and otherwise false.
 * @param Type The type to check.
 * @returns {boolean} True if a type is a union and otherwise false.
 * @see https://stackoverflow.com/a/53955431
 */
export type IsUnion<Type> = [Type] extends [UnionToIntersection<Type>]
  ? false
  : true;
