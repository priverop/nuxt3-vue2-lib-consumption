import { expectedValues } from "@/util/prop-validators";

export const inputProps = {

  variant: {
    type: String, required: false, default: 'primary',

    validator: expectedValues(
      'default', 'primary', 'secondary',
      'info', 'success', 'warning', 'danger', 'plain'
    )
  },

  alternate: { type: Boolean, required: false, default: false },

  font: {
    type: String, required: false, default: 'caps',
    validator: expectedValues('caps', 'sans', 'serif')
  },

  size: {
    type: String, required: false, default: 'md',
    validator: expectedValues('xs', 'sm', 'md', 'lg', 'xl')
  },
}