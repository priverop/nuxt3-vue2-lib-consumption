import {isObject, pick} from "@/util/util";

export const optionValue = (option, valueKey) => {
  return isObject(option) ? pick(option[valueKey]).toString() : pick(option).toString()
}

export const optionLabel = (option, labelKey) => {
  return isObject(option) ? option[labelKey] : option
}

export const optionIcon = (option, iconKey) => {
  return isObject(option) ? option[iconKey] : undefined
}

export const optionDisabled = (option, disabledKey) => {
  return isObject(option) ? option[disabledKey] : false
}

export const isSelected = (option, valueKey, value) => {
  let val = isObject(option) ? option[valueKey] : option
  return value === val
}
