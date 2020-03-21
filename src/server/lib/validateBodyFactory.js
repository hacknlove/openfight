export default function validateBodyFactory (schema) {
  return function validateBody ({
    set,
    control: { response }
  }, { body }) {
    console.log('1'.repeat(10))
    const validation = schema.validate(body)
    console.log('2'.repeat(10))

    if (validation.error) {
      return response({ error: 'badParameters', details: validation.error }, 400)
    }
    set.body = body
  }
}
