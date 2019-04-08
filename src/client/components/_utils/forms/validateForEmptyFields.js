export default (validationArray) => {
  const errors = validationArray.map((el) => {
    const { fieldData, setState } = el
    const { value, errorMessage } = fieldData
    if (!value && !errorMessage) {
      setState({ ...fieldData, errorMessage: 'Field cannot be empty.' })
      return false
    }
    if (value) {
      setState({ ...fieldData, errorMessage: null })
      return value
    }
    return false
  })
  return errors.every((e) => e)
}
