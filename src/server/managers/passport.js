import passport from 'passport'
import '../passportStrategies/local'
import '../passportStrategies/jwt'

export default function initializePassport (state, req, res) {
  return new Promise(resolve => {
    passport.initialize()(req, res, resolve)
  })
}
