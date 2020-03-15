import app, { switchMethod } from '../../server/managers/app'
import randomStrings from '../../server/lib/randomString'
import jwt from 'jsonwebtoken'
import { setCookie } from 'nookies'
import { authenticate } from '../../server/managers/passport'

function validate ({
  control: {
    done, response
  },
  set
}, { user }) {
  if (!user) {
    response('Authentication error', 401)
    return done()
  }
  if (user.error) {
    response(user.error, user.status)
    return done()
  }
  set.userCode = user.userCode
}

function createToken ({
  set,
  get: {
    userCode
  }
}) {
  set.randomString = randomStrings()
  set.token = jwt.sign({ sub: userCode, token: set.randomString }, process.env.JWT_SECRET)
}

async function insertToken ({
  mongo,
  get: {
    userCode,
    randomString
  }
}) {
  await mongo.collection('tokens').insertOne({
    date: new Date(),
    userCode,
    randomString
  })
}

function setCookieToken ({
  get: {
    token
  }
}, _, res) {
  setCookie({ res }, 'jwt', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  })
}

function response ({
  control: {
    response,
    done
  }
}) {
  response({ ok: true })
  done()
}

export default switchMethod({
  POST: app(
    authenticate('local', { session: false }),
    validate,
    createToken,
    setCookieToken,
    insertToken,
    response
  )
})
