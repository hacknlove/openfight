import app, { switchMethod } from '../../server/managers/app'
import joi from '@hapi/joi'
import validateBodyFactory from '../../server/lib/validateBodyFactory'
import additionalInformation from '../../../config/additionalInformation'
import { authenticate } from '../../server/managers/passport'

function prepareSchema (additionalInformation) {
  const schema = {
  }

  additionalInformation.forEach(control => {
    switch (control.type) {
      case 'select': {
        schema[control.name] = joi.string().valid(...control.options)
        break
      }
      case 'steps':
      case 'number': {
        schema[control.name] = joi.number().min(control.min).max(control.max)
        break
      }
      case 'text': {
        schema[control.name] = joi.string()
        break
      }
      case 'multi': {
        schema[control.name] = joi.array().items(joi.string().valid(...control.options))
      }
    }
  })

  return joi.object(schema).min(1)
}

const schema = prepareSchema(additionalInformation)

async function updateUser ({ get: { body: additionalInformation }, mongo, set }, { user: { _id }}) {
  await mongo.collection('users').updateOne({ _id }, {
    $set: {
      additionalInformation
    }
  })
}

function response ({
  control: { response }
}, req) {
  response({ ok: true })
}

export default switchMethod({
  POST: app(
    validateBodyFactory(schema),
    authenticate('jwt', { session: false }),
    updateUser,
    response
  )
})
