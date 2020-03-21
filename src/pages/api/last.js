import app, { switchMethod } from '../../server/managers/app'

import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'

async function findLastHistory ({
  mongo,
  set
}, {
  user: {
    _id
  }
}) {
  set.history = await mongo.collection('history').find({
    userId: _id
  }, {
    projection: {
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
    history
  }
}) {
  response(history)
}

export default switchMethod({
  GET: app(
    authenticate('jwt', { session: false }),
    validateUser,
    findLastHistory,
    response
  )
})
