export default function validateBodyFactory (schema) {
  return function validateBody ({
    set,
    control: { response }
  }, { body }) {
    const validation = schema.validate(body)

    if (validation.error) {
      return response({ error: 'badParameters', details: validation.error }, 400)
    }
    set.body = body
  }
}
