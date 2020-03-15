export default function validateBodyFactory (schema) {
  return function validateBody ({
    set,
    control: { response }
  }, { body }) {
    const validation = schema.validate(body)

    if (validation.error) {
      return response(400, validation.error)
    }
    set.body = body
  }
}
