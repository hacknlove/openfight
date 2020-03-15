import { useState, useEffect } from 'react'

const staticDefaultValues = {}

export default function useControlledForm ({
  fields,
  defaultValues = staticDefaultValues,
  refs,
  onIsDirtyChange,
  onHasErrorsChange,
  context
}) {
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})
  const [hasErrors, setHasErrors] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  if (refs) {
    refs.values = values
    refs.errors = errors
    refs.hasErrors = hasErrors
    refs.isDirty = isDirty
  }

  useEffect(() => setValues(defaultValues), [defaultValues])

  function getValue (name) {
    return values[name] || ''
  }

  function setValue (name, value) {
    const transformFunction = (fields[name] && fields[name].transform) || (fields.default && fields.default.transform)
    if (transformFunction) {
      value = transformFunction(value, values, errors, name, context)
    }
    if (values[name] === value) {
      return
    }

    setValues({
      ...values,
      [name]: value
    })

    setIsDirty(true)
    if (!isDirty) {
      onIsDirtyChange && onIsDirtyChange()
    }

    validateField([name, value])
  }
  function setInput ({ target: { name, value } }) {
    setValue(name, value)
  }
  function setChecked ({ target: { name, checked } }) {
    setValue(name, checked)
  }

  function validateField ([name, value]) {
    const validationFunction = (fields[name] && fields[name].rule) || (fields.default && fields.default.rule)
    if (validationFunction) {
      const error = validationFunction(value, values, errors, name, context)
      if (error !== errors[name]) {
        const newErrors = {
          ...errors,
          [name]: error
        }
        setErrors(newErrors)
        const hasNewErrors = Object.values(newErrors).some(e => e)
        if (hasNewErrors !== hasErrors) {
          setHasErrors(hasNewErrors)
          onHasErrorsChange && onHasErrorsChange()
        }
      }
    }
  }

  function validate () {
    const newErrors = { ...errors }
    let hasChanged = false
    const defaultRule = (fields.default && fields.default.rule) || (() => {})
    Object.entries(fields).map(([name, config]) => {
      const rule = config.rule || defaultRule
      const error = rule(values[name], values, errors, name, context)
      if (error === errors[name]) {
        return
      }
      hasChanged = true
      newErrors[name] = error
    })
    if (!hasChanged) {
      return hasErrors
    }
    setErrors(newErrors)
    const hasNewErrors = Object.values(newErrors).some(e => e)
    if (hasNewErrors !== hasErrors) {
      setHasErrors(hasNewErrors)
      onHasErrorsChange && onHasErrorsChange()
    }
    return hasNewErrors
  }
  function handleSubmit (cb) {
    return event => {
      event.preventDefault()
      if (validate()) {
        return
      }
      const cancel = cb(values)
      if (!cancel) {
        setIsDirty(false)
        if (isDirty && onIsDirtyChange) {
          onIsDirtyChange()
        }
      }
    }
  }

  return {
    values,
    errors,
    hasErrors,
    isDirty,
    setValues,
    setErrors,
    setHasErrors,
    setIsDirty,
    validate,
    setValue,
    getValue,
    setInput,
    setChecked,
    handleSubmit,
    validateField: (name, value) => validateField([name, value])
  }
}
