/**
 * string.js Utilities
 *
 * @description: A set of utilities for strings.
 */

import uuid from 'uuid'

export default {
  titleCase: str => {
    return str.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    )
  },
  generateLabelName: str => {
    const id = uuid.v4();
    const formattedName = str.toLowerCase().replace(/\s/g, '');
    return `${formattedName}_${id}`
  }
}
