export const commonSort = ({sortOrder, sortColumn}) => (a, b) => {
  if (
    !Object.prototype.hasOwnProperty.call(a, sortColumn) ||
    !Object.prototype.hasOwnProperty.call(b, sortColumn)
  )
    return 0 // property doesn't exist

  const valueA =
    typeof a[sortColumn] === 'string'
      ? a[sortColumn].toLowerCase()
      : a[sortColumn]
  const valueB =
    typeof b[sortColumn] === 'string'
      ? b[sortColumn].toLowerCase()
      : b[sortColumn]

  let comparison = 0

  if (typeof valueA === 'number' || typeof valueB === 'number') {
    if (valueA === null) {
      comparison = -1
    } else if (valueB === null) {
      comparison = 1
    } else {
      comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0
    }
  } else if (valueA && valueB) {
    const letterA = valueA.charAt(0).match(/[a-z0-9]/i)
    const letterB = valueB.charAt(0).match(/[a-z0-9]/i)

    if (letterA && !letterB) {
      comparison = 1
    } else if (!letterA && letterB) {
      comparison = -1
    } else if (valueA > valueB) {
      comparison = 1
    } else if (valueA < valueB) {
      comparison = -1
    }
  }

  return sortOrder === 'descending' ? comparison * -1 : comparison
}

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

export const pad = (num, size) => ('000000000' + num).substr(-size)
