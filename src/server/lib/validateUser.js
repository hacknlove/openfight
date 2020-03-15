export default function validateUser ({ control: { response, done } }, { user }) {
  if (!user) {
    return response('server error', 500)
  }
  if (user.error) {
    return response(user.error, user.status)
  }
}
