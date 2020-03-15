import app, { switchMethod } from '../../server/managers/app'
import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'

async function findUser ({
  mongo,
  set
}, {
  user: {
    _id
  }
}) {
  set.plainPassword = (await mongo.collection('users').findOne({
    _id
  }, {
    projection: {
      plainPassword: 1
    }
  })).plainPassword
}

function response ({
  control: {
    response,
    done
  },
  get: {
    plainPassword
  }
}) {
  response({
    ok: true,
    password: plainPassword
  })
  done()
}

export default switchMethod({
  GET: app(
    authenticate('jwt', { session: false }),
    validateUser,
    findUser,
    response
  )
})
