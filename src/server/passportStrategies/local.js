import { Strategy } from 'passport-local'
import passport from 'passport'
import { mongo } from '../managers/mongo'
import hashString from '../lib/hashStrings'

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},

async function (email, password, cb) {
  const db = await mongo.admin
  const user = await db.collection('users').findOne({
    email,
    password: hashString(password)
  }, {
    projection: {
      email: 1,
      roles: 1
    },
    collation: {
      locale: 'en',
      strength: 1
    }
  }).catch(err => ({ err }))

  if (!user) {
    return cb(null, { status: 401, error: 'user not found, or bad password' })
  }
  if (user.err) {
    return cb(null, { status: 500, error: user.err })
  }
  return cb(null, user)
}))
