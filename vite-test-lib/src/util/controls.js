import {expectedValues} from "@/util/prop-validators";

export const controlStates = ['busy', 'success', 'error', 'required']

export const controlProps = {
  size: {
    type: String, required: false, default: 'md',
    validator: expectedValues('sm', 'md', 'lg')
  },

  status: {
    type: String, required: false, default: undefined,
    validator: expectedValues(...controlStates)
  }
}

// Provide/inject keys
export const CONTROL_MODEL = 'aisControlModel'
export const CONTROL_PARENT_UPDATE = 'aisControlParentUpdateFn'
export const CONTROL_ID = 'aisControlId'
export const CONTROL_NAME = 'aisControlName'
export const CONTROL_SIZE = 'aisControlSize'
export const CONTROL_DISABLED = 'aisControlDisabled'
export const CONTROL_REQUIRED = 'aisControlRequired'
export const CONTROL_INVALID = 'aisControlInvalid'