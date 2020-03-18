import app, { switchMethod } from '../../server/managers/app'

import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'

async function findLastDiagnostico ({
  mongo,
  set
}, {
  user: {
    _id
  }
}) {
  set.diagnostico = await mongo.collection('sintomas').find({
    userId: _id
  }, {
    projection: {
      ip: 0,
      _id: 0,
      userId: 0
    }
  })
    .sort({ _id: -1 })
    .limit(1)
    .next()
}

function response ({
  control: {
    response
  },
  get: {
    diagnostico
  }
}) {
  response(diagnostico)
}

export default switchMethod({
  GET: app(
    authenticate('jwt', { session: false }),
    validateUser,
    findLastDiagnostico,
    response
  )
})
