import { Strategy } from 'passport-local'
import passport from 'passport'
import { mongo } from '../managers/mongo'
import hashString from '../lib/hashStrings'

passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
},

async function (userCode, password, cb) {
  const user = await mongo.db.collection('users').findOne({
    userCode,
    password: hashString(password)
  }, {
    projection: {
      userCode: 1
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
