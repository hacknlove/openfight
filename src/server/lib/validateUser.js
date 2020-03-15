module.exports = function validateUser ({ user, context: { done } }, _, next) {
  if (!user) {
    return done(500, 'server error')
  }
  if (user.error) {
    return done(user.status, [], user.error)
  }
  next()
}
