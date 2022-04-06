export function hasValue(target) {
  if(!target) return false;
  return target['trim'] ? target.trim() !== '' : true
}

export function hasArray(target) {
  return Array.isArray(target) && target.length > 0
}

export function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

export function isString(value) {
  return typeof value === 'string'
}

export function pick(...values) {
  let result = values.find(val => val)
  return result ? result : ''
}

/**
 * It is common for a prop to accept either a single value or an array of values.
 * ensureArray() inspects the target to ensure it is an array or wraps the
 * single value in an array.
 *
 * @param target
 */
export function ensureArray(target) {
  if(target === undefined || target === null || !hasValue(target)) return []
  return Array.isArray(target) ? target : [target]
}

/**
 * Take a root object and a path string and resolve it to a value.
 * Example:
 *
 * let root = {foo: { bar: 'baz'}}
 * let value = valueForPath(root, 'foo.bar')
 * // value = 'baz'
 *
 * Invalid paths will return undefined
 */
export function valueForPath(object, path) {
  if(!object) return undefined
  let pathSegments = pick(path).split('.')

  return pathSegments.reduce(

    // Apply path segments, checking for valid keys
    (currentRoot, pathSegment) => {
      return isObject(currentRoot) ?
        currentRoot[pathSegment] : undefined
    },

    // Start with the object param.
    object
  )
}

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/UUID
 *
 * I don't understand how to make this work on the server-side
 *
 * @returns {string} a generated v4 UUID
 */
// export function uuid() {
//   return crypto.randomUUID()
// }

/**
 * @returns {string} a 4-digit sub-string out of a generated UUID
 */
export function shortUuid() {
  return `${Math.floor(Math.random() * 1000000)}`
  //return uuid().substring(9, 13)
}

/**
 * Transform a string into a form usable as a DOM id.
 * Label will be lower-cased, spaces will be replaced with '-', and
 * a short uuid will be appended.
 *
 * @param label A descriptive string of the element it will identify
 * @returns {string} - A value suitable for a DOM id.
 */
export function labelToId(label) {
  return pick(label)
    .toLowerCase()
    .replace(' ', '-')
    .concat('-', shortUuid())
}

/**
 * Experimental
 *
 * I would not call this method production ready
 *
 * Todo: How do we consistently detect there is no
 *  ref binding vs an empty ref?
 *
 * - Maybe this should just be if a ref is present
 * - For instance we may have a ref with an empty string
 *   for a component in an initial state.
 *
 * pickRef allows developers to set a precedence order
 * for a series of ref objects and returns the first
 * ref that has a non-falsy value.
 *
 * Useful in situations where a component may need to
 * choose between a prop value and a provided value.
 *
 *   const model = useVModel(props, 'modelValue', emit)
 *   let providedModel = inject('fieldModel', undefined)
 *
 *   // modelValue prop takes precedence
 *   let fieldModel = pickRef(model, providedModel)
 *
 *   // provider takes precedence
 *   let fieldModel = pickRef(providedModel, model)
 *
 * @param values - Set of ref objects
 * @returns - The first ref object whose value is not falsy
 */
export function pickRef(...values) {
  let result = values.find(val => {
    if(val && val.value) return val
    return undefined
  })
  return result ? result : undefined
}


export function emptyToUndef(val) {
  return (hasValue(val)) ? val : undefined
}

export function emptyToNull(val) {
  return (hasValue(val)) ? val : null
}

export function hasBoolean(val) {
  return val === true || val === false
}

export function fallback(...fallbackList) {
  return fallbackList.find(e => (e && e.trim() !== ''))
}
