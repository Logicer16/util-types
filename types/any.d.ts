/**
 * @file Types related to the use of `any`.
 */

/**
 * Check if a type is `any`.
 * @param Type The type to check.
 * @returns {boolean} True if a type is `any` and otherwise false.
 * @see https://stackoverflow.com/a/55541672
 */
export type IsAny<Type> = 0 extends Type & 1 ? true : false;
