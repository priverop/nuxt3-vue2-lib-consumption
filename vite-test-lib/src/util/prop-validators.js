import {isString} from "@/util/util";

/**
 * Generates a prop validator that tests against a list of expected values
 *
 * @param expectedValues - array of expected, valid values
 * @returns a function that checks if its parameter is in the provided list
 */
export function expectedValues(...expectedValues) {
  return (value) => expectedValues.includes(value)
}

/**
 * Generates a prop validator that tests a string or an array of strings
 * to make sure all values start with the provided prefix.
 *
 * @param prefix
 * @returns {(function(*): (*|boolean))|*}
 */
export function prefixValidator(prefix) {
  return (value) => {
    if(isString(value)) {
      return value.startsWith(prefix)
    }

    if(Array.isArray(value)) {
      return value.every(v => v.startsWith(prefix))
    }

    return false
  }
}