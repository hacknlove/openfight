import app, { switchMethod } from '../../server/managers/app'
import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'
import { destroyCookie } from 'nookies'

function closeSession ({
  mongo
}, {
  user: {
    userCode,
    randomString
  }
}) {
  mongo.collection('tokens').remove({ userCode, randomString })
}

function destroyTokenCookie (state, req) {
  destroyCookie({ req }, 'jwt')
}

function response ({
  control: {
    response,
    done
  }
}) {
  response({
    ok: true
  })
  done()
}

export default switchMethod({
  POST: app(
    authenticate('jwt', { session: false }),
    validateUser,
    closeSession,
    destroyTokenCookie,
    response
  )
})
