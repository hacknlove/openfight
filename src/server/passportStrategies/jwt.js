import passport from 'passport'
import { mongo } from '../managers/mongo'
import { Strategy, ExtractJwt} from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { parseCookies } from 'nookies'

function cookieExtractor (req) {
  const cookies = parseCookies({ req })
  return cookies.jwt
}
function noneExtractor () {
  return jwt.sign({ none: true }, process.env.JWT_SECRET)
}

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
    noneExtractor
  ]),
  secretOrKey: process.env.JWT_SECRET
}, async function (jwtPayload, done) {
  if (jwtPayload.none) {
    return done(null, {
      status: 200,
      error: 'token not found'
    })
  }

  const admin = await mongo.admin
  const tokenPromise = admin.collection('tokens').findOne({
    email: jwtPayload.sub + '',
    randomString: jwtPayload.token + ''
  })

  const userPromise = admin.collection('users').findOne({
    email: jwtPayload.sub + ''
  }, {
    projection: {
      email: 1,
      roles: 1
    }
  })

  const token = await tokenPromise.catch(err => (err))

  if (!token) {
    return done(null, { status: 401, error: 'user not found, or token not valid' })
  }

  if (token.err) {
    return done(null, { status: 500, error: 'database error' })
  }

  const user = await userPromise.catch(err => ({ err }))

  if (!user) {
    return done(null, { status: 401, error: 'user not found, or token not valid' })
  }

  if (user.err) {
    return done(null, { status: 500, error: 'database error' })
  }

  return done(null, user)
}))
